import './DrawPage.scss';

import React, { useEffect } from 'react';

type DrawPageProps = {};

type Point = {
  x: number;
  y: number;
};

export const DrawPage: React.FC<DrawPageProps> = (props) => {
  let lastPoint: Point | null = null;

  useEffect(() => {
    const canvas = getCanvas();
    canvas.addEventListener("touchstart", handleTouchStart, false);
    canvas.addEventListener("mousedown", handleMouseStart, false);
    canvas.addEventListener("mousemove", handleMouseMove, false);
    document.addEventListener("mouseup", handleMouseUp, false);

    canvas.addEventListener("touchend", handleTouchEnd, false);
    canvas.addEventListener("touchcancel", handleCancel, false);
    canvas.addEventListener("touchmove", handleTouchMoved, false);

    return () => {
      if (canvas) {
        canvas.removeEventListener("touchstart", handleTouchStart);
        canvas.removeEventListener("mousedown", handleMouseStart, false);
        canvas.removeEventListener("mousemove", handleMouseMove, false);
        document.removeEventListener("mouseup", handleMouseUp, false);

        canvas.removeEventListener("touchend", handleTouchEnd, false);
        canvas.removeEventListener("touchcancel", handleCancel, false);
        canvas.removeEventListener("touchmove", handleTouchMoved, false);
      }
    };

    function getCanvas(): HTMLCanvasElement {
      return document.getElementById("canvas") as HTMLCanvasElement;
    }

    function getContext() {
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        throw new Error("No 2d Context");
      }
      return ctx;
    }

    function handleMouseStart(evt: MouseEvent) {
      console.log("mouse down", evt.pageX, evt.pageY);
      const ctx = getContext();
      const point = {
        x: evt.pageX,
        y: evt.pageY - 64,
      };
      lastPoint = point;
      ctx.beginPath();
      ctx.arc(point.x, point.y, 1, 0, 2 * Math.PI, false); // a circle at the start
      ctx.fillStyle = "#00FF00";
      ctx.fill();
    }

    function handleMouseUp() {
      lastPoint = null;
    }

    function handleMouseMove(evt: MouseEvent) {
      if (!lastPoint) {
        return;
      }

      const ctx = getContext();
      ctx.beginPath();
      ctx.moveTo(lastPoint.x, lastPoint.y);

      const newPoint = {
        x: evt.pageX,
        y: evt.pageY - 64,
      };

      ctx.lineTo(newPoint.x, newPoint.y);
      ctx.stroke();

      lastPoint = newPoint;
    }

    function handleTouchStart(evt: TouchEvent) {
      evt.preventDefault();

      const ctx = getContext();
      const touches = evt.changedTouches;

      for (let i = 0; i < touches.length; i++) {
        const point = {
          x: touches[i].pageX,
          y: touches[i].pageY - 64,
        };

        ctx.beginPath();
        ctx.arc(point.x, point.y, 1, 0, 2 * Math.PI, false); // a circle at the start
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();

        lastPoint = point;
      }
    }

    function handleTouchMoved(evt: TouchEvent) {
      console.log("touch moved");

      evt.preventDefault();

      if (!lastPoint) {
        return;
      }

      const ctx = getContext();
      const touches = evt.changedTouches;

      for (let i = 0; i < touches.length; i++) {
        const point = {
          x: touches[i].pageX,
          y: touches[i].pageY - 64,
        };

        ctx.beginPath();
        ctx.moveTo(lastPoint.x, lastPoint.y);
        ctx.lineTo(point.x, point.y);
        ctx.strokeStyle = "#FFFFFF";
        ctx.stroke();

        lastPoint = point;
      }
    }

    function handleTouchEnd(evt: TouchEvent) {
      console.log("touch end");
      evt.preventDefault();

      lastPoint = null;
    }
  });

  function handleCancel() {}

  return (
    <div className="draw-page">
      <canvas id="canvas" width="800px" height="1000px">
        Your browser does not support canvas element.
      </canvas>
    </div>
  );
};
