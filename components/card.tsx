import React from "react";
import Image from "next/image";
import img from "../app/images/reviewimage.png"
interface Data{
  name:string,
  type:string,
  review:string
}

function Card(data:Data) {
  return (
    <>
      <div className="bg-gray-100 text-center md:text-left shadow-md justify-center items-center rounded-lg gap-2 m-4 p-2 lg:p-8 lg:pt-12 flex flex-col md:flex-col lg:flex-row">
        <Image src={img} alt="error" className="rounded-md" />
        <div className="sm:w-2/3 p-1">
          <div className="p-1 text-md font-medium text-gray-600">"{data.review}".</div>
          <div className="mt-4 p-1 text-3xl font-bold">{data.name}</div>
          <div className="p-1 text-md font-medium">{data.type}</div>
        </div>
      </div>
    </>
  );
}

export default Card;
