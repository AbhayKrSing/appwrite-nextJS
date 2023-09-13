"use client";
export default function Userprofile({ params }: any) {
  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <h1 className="text-white text-center text-4xl">
        Profile page
        <span className="bg-orange-500 p-2 rounded">{params.id}</span>
      </h1>
    </>
  );
}
