import { Rating } from "../types";

interface Props {
  ratingList: Rating[];
}

function RatingList({ ratingList }: Props) {
  return (
    <>
      <ul>
        {ratingList.map(({ rating, score, text }, idx) => (
          <li key={idx}>
            Text: {text}, Score: {score}, rating: {rating}
          </li>
        ))}
      </ul>
    </>
  );
}

export default RatingList;
