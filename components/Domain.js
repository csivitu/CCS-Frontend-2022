import { Modal, Typography } from "@mui/material";
import ClockIcon from "../public/assets/clock.svg";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function Domain({ details, endTime }) {
  const [hover, setHover] = useState(false);
  const [open, setOpen] = useState(false);
  const style = {
    position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", maxWidth: 600,
    width: "90%",
    height: 300,
    backgroundColor: `var(--${details.name})`,
    color: "white",
    borderRadius: 20,
    padding: 30,
    display: "flex",
    alignItems: "center",
    gap: 10,
    outline: "none",
  };

  function NormalImage() {
    return (
      <Image src={details.image} height={350} width={500} alt={details.name} priority={true} />
    );
  }

  function HoverImage() {
    return (
      <Image
        src={details.imageHover}
        height={350}
        width={500}
        alt={details.name}
        priority={true}
      />
    );
  }

  return (
    <>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex items-center justify-center"
      >
        <div style={style}>
          <div style={{
            width: "300px"
          }}>
            <Image
              src={details.smImage}
              height={400}
              width={320}
              alt={details.name}
              priority={true}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <h1
              style={{
                fontWeight: "bold",
                fontSize: "1.5rem",
                textTransform: "uppercase",
              }}
            >
              {details.name}
            </h1>
            <p
              style={{
                fontWeight: "300",
                letterSpacing: 1,
              }}
            >
              {details.description}
            </p>
            {endTime ? (endTime.completed ? (
              <>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <a
                    style={{
                      padding: "5px 10px",
                      color: "gray",
                      fontSize: "0.8rem",
                      backgroundColor: "white",
                      borderRadius: 5,
                    }}
                  >
                    ATTEMPTED
                  </a>
                </div>
              </>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Link href={`/quiz/${details.name}`} shallow={true}>
                  <a
                    style={{
                      padding: "5px 10px",
                      color: "black",
                      fontSize: "0.8rem",
                      backgroundColor: "white",
                      borderRadius: 5,
                    }}
                  >
                    RESUME
                  </a>
                </Link>
                <ClockIcon />
              </div>
            )) : (
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Link href={`/quiz/${details.name}`} shallow={true}>
                  <a
                    style={{
                      padding: "5px 10px",
                      color: "black",
                      fontSize: "0.8rem",
                      backgroundColor: "white",
                      borderRadius: 5,
                      whiteSpace: "nowrap"
                    }}
                  >
                    TAKE TEST
                  </a>
                </Link>
                <p>30:00</p>
                <ClockIcon />
              </div>
            )}

          </div>
        </div>
      </Modal>
      {endTime ? endTime.completed ? (
        <div
          className="relative flex flex-col items-center w-60 -ml-20 cursor-pointer "
          onClick={() => setOpen(true)}
        >
          <HoverImage />
          <h1 className="font-bold uppercase">{details.name}</h1>
        </div>
      ) : (
        <div
          className="relative flex flex-col items-center w-60 -ml-20 cursor-pointer animate-wiggle"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={() => setOpen(true)}
        >
          {hover ? <HoverImage /> : <NormalImage />}
          <h1 className="font-bold uppercase">{details.name}</h1>
        </div>
      ) : (<div
        className="relative flex flex-col items-center w-60 -ml-20 cursor-pointer"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => setOpen(true)}
      >
        {hover ? <HoverImage /> : <NormalImage />}
        <h1 className="font-bold uppercase">{details.name}</h1>
      </div>
      )}


    </>
  );
}

export default Domain;
