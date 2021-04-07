var dayjs = require("dayjs");
module.exports = {
  friendlyName: "Handle schedule",

  description: "",

  inputs: {
    startDate: { type: "string", required: true },
  },

  exits: {
    success: {
      description: "All done.",
    },
  },

  fn: async function (inputs, exits) {
    try {
      const films = await Films.find();
      const rooms = await Rooms.find();
      const time = 6;
      let arr = [];
      const totalFilms = films.length;
      const totalRooms = rooms.length;
      let timeLine = parseInt(
        // dayjs("2021-03-20").hour(8).minute(0).second(0).valueOf()
        dayjs(inputs.startDate).hour(8).minute(0).second(0).valueOf()
      );
      let f = 0,
        r = 0,
        count = 0;
      while (count <= time) {
        if (r % totalRooms === 0) {
          timeLine += parseInt(films[f % totalFilms].duration);
          if (parseInt(dayjs(timeLine).hour()) >= 22) {
            count++;
            timeLine = dayjs(inputs.startDate)
              .hour(8)
              .minute(0)
              .second(0)
              .add(count, "day")
              .valueOf();
          }
        }

        arr.push({
          roomId: rooms[r % totalRooms].id,
          filmId: films[f % totalFilms].id,
          timeMilestones:
            arr[arr.length - totalRooms] === undefined
              ? parseInt(dayjs(timeLine).hour(8).minute(0).second(0).valueOf())
              : parseInt(dayjs(arr[arr.length - totalRooms].timeEnd).hour()) <
                22
              ? parseFloat(arr[arr.length - totalRooms].timeEnd)
              : parseFloat(
                  dayjs(arr[arr.length - totalRooms].timeEnd)
                    .add(1, "day")
                    .hour(8)
                    .minute(0)
                    .second(0)
                    .valueOf()
                ),
          timeEnd:
            (arr[arr.length - totalRooms] === undefined
              ? parseInt(dayjs(timeLine).hour(8).minute(0).second(0).valueOf())
              : parseInt(
                  dayjs(arr[arr.length - totalRooms].timeMilestones).hour()
                ) < 22
              ? parseFloat(arr[arr.length - totalRooms].timeMilestones)
              : parseFloat(
                  dayjs(arr[arr.length - totalRooms].timeMilestones)
                    .add(1, "day")
                    .hour(8)
                    .minute(0)
                    .second(0)
                    .valueOf()
                )) + parseFloat(films[f % totalFilms].duration),
          date: parseInt(dayjs(inputs.startDate).add(count, "day").valueOf()),
        });
        f++;
        r++;
      }
      await Schedule.createEach(arr);
      return exits.success({
        message: "true",
        data: arr,
      });
    } catch (error) {
      console.log(error);
      return exits.success({
        message: "false",
      });
    }
    // const maxTime = Math.ceil(
    //   films.reduce((a, b) => (a.duration > b.duration ? a : b)).duration
    // );
    // const shift = Math.floor(18 / maxTime);
    // let start = 6;
    // for (let i = 0; i < shift; i++) {
    //   for (let j = 0; j < rooms.length; j++) {
    //     const firstItem = films.shift();
    //     films.push(firstItem);
    // await Schedule.create({
    //   timeMilestones: start,
    //   filmId: firstItem.id,
    //   roomId: j,
    // });
    //   }
    //   start += maxTime;
    // }
  },
};
