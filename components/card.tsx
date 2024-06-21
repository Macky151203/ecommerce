import React from "react";
import Image from "next/image";
import img from "../app/images/person.png"
interface Data{
  name:string,
  type:string,
  review:string
}

function Card(data:Data) {
  return (
    <>
      <div className="bg-white text-center md:text-left shadow-md justify-center items-center rounded-lg gap-2 m-4 p-1 lg:p-2 flex flex-col md:flex-col lg:flex-row">
        <Image src={img} alt="error" className="rounded-md" />
        <div className="sm:w-2/3 p-1">
          {/* //<div className="mt-4 p-1 text-3xl font-bold">{data.name}</div> */}
          <div className="p-1 font-thin italic text-md text-gray-600">"{data.review}".</div>
          <div className="p-1 text-md font-medium">-{data.name}</div>
        </div>
      </div>
    </>
  );
}

export default Card;
