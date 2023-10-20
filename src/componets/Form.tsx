import { FormEvent, useEffect, useState } from "react";
import { GetScoreResponse, Rating, GetRatingResponse } from "./../types";
import Star from "./Star";
import RatingList from "./RatingList";
import "../App.css";

const API_URL = "http://localhost:4000/";

const STAR_LIST = [...Array(10).keys()].map((_, idx) => idx);

function Form() {
  const [currentScore, setCurrentScore] = useState(0);
  const [selectedRating, setSelectedRating] = useState(-1);
  const [ratingList, setRatingList] = useState<Rating[]>([]);
  const [value, setValue] = useState("");

  const getAnSetScore = async () => {
    const scoreData = await fetch(`${API_URL}get_nps_score`);
    const { nps } = (await scoreData.json()) as GetScoreResponse;

    setCurrentScore(nps);
  };

  const getAndSetRatingList = async () => {
    const response = await fetch(`${API_URL}get_ratings`);
    const { ratings } = (await response.json()) as GetRatingResponse;

    setRatingList(ratings);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      rating: selectedRating + 1,
      score: currentScore,
      text: value,
    });

    const requestOptions: RequestInit = {
      method: "POST",
      headers,
      body: raw,
      redirect: "follow",
    };

    try {
      await fetch(`${API_URL}add_rating`, requestOptions);

      alert("New item added");

      await getAnSetScore();
      await getAndSetRatingList();

      // reset form
      setValue("");
      setSelectedRating(-1);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAnSetScore().catch((err) => {
      console.error(err);
    });
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit} className='Score'>
        <div className='body'>
          <h3>
            How likely are you recommend our product to a friend or family
          </h3>

          <div style={{ display: "flex" }}>
            {STAR_LIST?.map((item) => (
              <div key={item} onClick={() => setSelectedRating(item)}>
                <Star isActivate={item <= selectedRating} />
              </div>
            ))}
          </div>

          <textarea value={value} onChange={(e) => setValue(e.target.value)} />
        </div>

        <div className='footer'>
          <span>NPS Store {currentScore}</span>
          <button type='submit'>Submit</button>
        </div>

        {/* We need to change the location fot his linting  */}
        <RatingList ratingList={ratingList} />
      </form>
    </>
  );
}

export default Form;
