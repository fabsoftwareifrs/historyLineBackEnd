const HttpResponse = require("../http/httpResponse.js");
const { User, Room, Data, UsersRooms } = require("../models/");
const { updateUser } = require("../services/UpdateUserService.js");
const { Op } = require("sequelize");

module.exports = {
  async playerTry(req, res) {
    const { dataYear, dataIndex, roomIndex, datas, user } = req.body;
    const userExist = await UsersRooms.findOne({
      where: { room_id: roomIndex, user_id: user },
    });

    if (!userExist) {
      await UsersRooms.create(
        {
          roomId: roomIndex,
          userId: user,
        },
        { include: { model: Room, User } }
      );
    }
    try {
      const answer = await Data.findOne({ where: { id: dataIndex } });
      const allData = await Data.findAll({ where: { room_id: roomIndex } });
      const originalDatas = allData.filter((e) => {
        return datas.find((el) => el.id === e.id);
      });
      if (dataYear !== answer.year && datas[0].id) {
        // const resp = allData.reduce((prev, atual) => {
        //   return Math.abs(dataYear - atual.year) < Math.abs(dataYear - prev)
        //     ? atual.year
        //     : prev;
        // }, allData[0].year);

        const filtData = allData.filter((el) => {
          return (
            (el.year >= answer.year &&
              el.year < originalDatas[datas.length - 1].year) ||
            (el.year <= answer.year &&
              el.year > originalDatas[datas.length - 1].year) ||
            (dataYear > answer.year &&
              dataYear > originalDatas[datas.length - 1].year &&
              el.year >= answer.year &&
              el.year > originalDatas[datas.length - 1].year) ||
            (dataYear < answer.year &&
              dataYear < originalDatas[datas.length - 1].year &&
              el.year <= answer.year &&
              el.year < originalDatas[datas.length - 1].year)
          );
        });

        const rightData = filtData.map((e) => {
          return Math.abs(e.year - dataYear);
        });

        const rightValue = allData.map((e) => {
          return Math.abs(e.year - dataYear);
        });

        const ultraRightValue = rightValue.indexOf(Math.min(...rightData));

        const resp = allData[ultraRightValue].year;

        const leastYear = await Data.findOne({
          where: {
            year: resp,
            room_id: roomIndex,
          },
        });
        const { year, id, hint, data } = leastYear;
        const newData = originalDatas.map((e) => {
          const { year, id, data, hint } = e;
          try {
            return {
              year,
              id,
              data,
              hint,
            };
          } catch (error) {
            return HttpResponse.badRequest(res, error.message);
          }
        });

        const filterData = newData.map((e) => {
          return e.year;
        });

        if (!filterData.includes(resp) && resp !== answer.year) {
          newData.push({
            year,
            id,
            data,
            hint,
            marquer: "DADO NOVO",
          });
          HttpResponse.ok(res, newData);
        } else if (year === answer.year) {
          newData.push({
            over: "GAME OVER!!",
          });
          HttpResponse.ok(res, newData);
        } else {
          HttpResponse.ok(res, newData);
        }
      } else if (!datas[0].id && answer.year !== dataYear) {
        const rightValue = allData.map((e) => {
          return Math.abs(e.year - dataYear);
        });
        const right = rightValue.indexOf(Math.min(...rightValue));
        const resp = allData[right].year;
        const leastYear = await Data.findOne({
          where: {
            year: resp,
            room_id: roomIndex,
          },
        });

        const { year, id, hint, data } = leastYear;
        try {
          return HttpResponse.ok(res, {
            year,
            id,
            data,
            hint,
          });
        } catch (error) {
          return HttpResponse.badRequest(res, error.message);
        }
      } else if (dataYear === answer.year) {
        const rightDatas = datas.filter((e) => e.id).length + 1;
        userExist.pointsRoom += ((10 - rightDatas) / 10) * 100;
        try {
          const newPoints = await UsersRooms.update(
            {
              pointsRoom: userExist.pointsRoom,
            },
            {
              where: {
                room_id: roomIndex,
                user_id: user,
              },
            }
          );

          return HttpResponse.ok(res, "CONGRATULATIONS!!");
        } catch (error) {
          return HttpResponse.badRequest(res, error.message);
        }
      }
    } catch (error) {
      return HttpResponse.badRequest(res, error.message);
    }
  },
};
