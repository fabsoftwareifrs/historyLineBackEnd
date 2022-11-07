const HttpResponse = require("../http/httpResponse.js");
const { User, Room, Data, UsersRooms } = require("../models/");
const calcYear = require("../functions/calcYear.js");
const { updateUser } = require("../services/UpdateUserService.js");
const { Op } = require("sequelize");

module.exports = {
  async playerTry(req, res) {
    const { dataYear, id, roomIndex, datas } = req.body;
    const { userId } = req;
    const userExist = await UsersRooms.findOne({
      where: { room_id: roomIndex, user_id: userId },
    });
    const dataIds = datas.map((e) => e.id);
    if (!userExist) {
      await UsersRooms.create(
        {
          roomId: roomIndex,
          userId: userId,
        },
        { include: { model: Room, User } }
      );
    }
    try {
      const answer = await Data.findOne({ where: { id: id } });
      const thereDatas = await Data.findAll({
        order: [["year", "ASC"]],
        where: { room_id: roomIndex },
      });

      const originalDatas = thereDatas.filter((e) => {
        return datas.find((el) => el.id === e.id);
      });

      const dataYears = originalDatas.map((e) => e.year);

      if (!originalDatas.length) {
        return HttpResponse.badRequest(
          res,
          "Esses dados não existem nessa sala"
        );
      } else if (datas.length === thereDatas.length) {
        return HttpResponse.badRequest(res, "Acabaram as tentativas!");
      }

      if (dataYear !== answer.year) {
        const newData = originalDatas.map((e) => {
          const { year, id, hint, data } = e;
          return {
            year,
            id,
            hint,
            data,
          };
        });

        const answerIndex = dataIds.indexOf(answer.id);
        console.log(answerIndex);

        const ascData = await Data.findAll({
          attributes: ["year", "id", "hint", "data"],
          order: [["year", "ASC"]],
          where: { room_id: roomIndex },
        });

        const descData = await Data.findAll({
          attributes: ["year", "id", "hint", "data"],
          order: [["year", "desc"]],
          where: { room_id: roomIndex },
        });

        const ascFormatedData = ascData.filter((el) => {
          const filter = dataYears.find((e) => e === el.year);

          return filter !== el.year;
        });

        const descFormatedData = descData.filter((el) => {
          const filter = dataYears.find((e) => e === el.year);
          return filter !== el.year;
        });

        if (dataYear < answer.year) {
          let filtData = ascFormatedData.find((el) => {
            return el.year >= dataYear;
          });
          if (!filtData) {
            filtData = descFormatedData.find((el) => {
              return el.year <= dataYear;
            });
          }
          const { year, id, hint, data } = filtData;
          console.log(filtData.year);

          newData.splice(
            filtData.year > answer.year ? answerIndex + 1 : answerIndex,
            0,
            {
              year,
              id,
              hint,
              data,
              marquer: "Dado novo",
            }
          );
          const calc = calcYear(...newData);
          calc.map((e) => {
            newData.map((element) => {
              element.clacYear = e;
            });
          });
          try {
            HttpResponse.ok(res, newData);
          } catch (error) {
            HttpResponse.badRequest(res, error.message);
          }
        } else if (dataYear > answer.year) {
          let filtData = descFormatedData.find((el) => {
            return el.year <= dataYear;
          });
          if (!filtData) {
            filtData = descFormatedData.find((el) => {
              return el.year > dataYear;
            });
          }
          console.log(filtData.year);
          const { year, id, hint, data } = filtData;

          newData.splice(
            filtData.year > answer.year ? answerIndex + 1 : answerIndex,
            0,
            {
              year,
              id,
              hint,
              data,
              marquer: "Dado novo",
            }
          );
          const calc = calcYear(...newData);

          calc.map((e, i) => {
            newData[i].calcYear = e;
          });
          try {
            HttpResponse.ok(res, newData);
          } catch (error) {
            HttpResponse.badRequest(res, error.message);
          }
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
                user_id: userId,
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
