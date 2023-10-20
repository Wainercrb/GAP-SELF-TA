interface Props {
  isActivate: boolean;
}

function Star({ isActivate }: Props) {
  return (
    <>
      {!isActivate ? (
        <div>
          <img src='../public/Star_Grey.png' alt='' />
        </div>
      ) : (
        <div>
          <img src='../public/Star_Purple.png' alt='' />
        </div>
      )}
    </>
  );
}

export default Star;
