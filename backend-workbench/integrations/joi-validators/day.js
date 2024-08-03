import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);
import Chance from "chance";

export const createPost = async (req, res) => {
  try {
    const { authorId } = req.params;
    const date = dayjs().tz("Asia/Kolkata");
    const currentDate = dayjs().tz("Asia/Kolkata").format("YYYY-MM-DD");
    const nextDate = dayjs()
      .tz("Asia/Kolkata")
      .add(1, "day")
      .format("YYYY-MM-DD");

    const chance = new Chance();
    const postId = "PO"
      .concat(
        dayjs().format("MM"),
        dayjs().format("DD"),
        chance.string({
          length: 4,
          alpha: false,
          numeric: true,
        })
      )
      .toString();

    if (!mongoose.Types.ObjectId.isValid(authorId)) {
      return resHelperFail(res, 400, "Author Id is not an objectId");
    }
    return res.json({ data: postId });
  } catch (error) {
    console.error(error);
  }
};
