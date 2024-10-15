import Button from "./Button";

interface StepCardProps {
  color: string;
  img: string;
  title: string;
  body: string;
  step: number;
  button?: { text: string; invert: boolean };
}

function StepCard({ color, img, title, body, step, button }: StepCardProps) {
  return (
    <div>
      <div className="flex align-middle gap-3 ">
        {" "}
        <h1
          className={`h-[3.5rem] font-medium  mt-5  pb-2 text-[2.3rem] rounded-full text-center  w-[3.5rem]`}
          style={{ backgroundColor: color }}
        >
          {step}
        </h1>{" "}
        <h1 className="pt-7  font-medium pl-3 text-[1.6rem] sm-text-[1.8rem]">
          {title}
        </h1>
      </div>
      <div className="flex flex-col  md:flex-row gap-5 justify-between">
        <div>
          <p className=" pt-10 [@media(max-width:1005px)]:w-[100%] text-[1.4rem] font-medium  md:text-[1.3rem] w-[30rem]">
            {body}
          </p>
          <div className="pt-3">
            {button && <Button text={button.text} invert={button.invert} />}
          </div>
        </div>

        <img className="   md:w-[40%]  pt-10  " src={img}></img>
      </div>
    </div>
  );
}

export default StepCard;
