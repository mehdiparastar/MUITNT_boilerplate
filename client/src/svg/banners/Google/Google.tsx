import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { keyframes } from '@emotion/react';
import { css } from '@emotion/css';
import { ReactComponent as Svg } from './Google.svg';

interface ImousePos {
  x: number;
  y: number;
}

const createTranslator =
  (svgViewBox: SVGRect | null, svgDimension: DOMRect | null) =>
    (a: number, b: number): [x: number, y: number] => {
      if (!svgViewBox || !svgDimension) {
        return [a, b];
      }
      const { width: viewBoxWidth, height: viewBoxHeight } = svgViewBox;
      const { top, left, width: svgWidth, height: svgHeight } = svgDimension;

      const x = ((a - left) * viewBoxWidth) / svgWidth;
      const y = ((b - top) * viewBoxHeight) / svgHeight;
      return [x, y];
    };

const GoogleBannerSVG: React.FC<SvgIconProps> = ({ sx, ...rest }) => {
  const theme = useTheme();
  const svgRef = useRef<SVGSVGElement>(null);
  const [svgObjectsPXtoCursor, setSvgObjectsPXtoCursor] =
    useState({
      emptyCircle01: { x: 0, y: 0 },
      emptyCircle02: { x: 0, y: 0 },
      emptyCircle03: { x: 0, y: 0 },
      emptyCircle04: { x: 0, y: 0 },
      emptyCircle05: { x: 0, y: 0 },
      emptyCircle06: { x: 0, y: 0 },
      emptyCircle07: { x: 0, y: 0 },
      fullCircle01: { x: 0, y: 0 },
      fullCircle02: { x: 0, y: 0 },
      fullCircle03: { x: 0, y: 0 },
      fullCircle04: { x: 0, y: 0 },
      fullCircle05: { x: 0, y: 0 },
      fullCircle06: { x: 0, y: 0 },
      fullCircle07: { x: 0, y: 0 },
      rectangle01: { x: 0, y: 0 },
      rectangle02: { x: 0, y: 0 },
      rectangle03: { x: 0, y: 0 },
      rectangle04: { x: 0, y: 0 },
      rectangle05: { x: 0, y: 0 },
      rectangle06: { x: 0, y: 0 },
      rectangle07: { x: 0, y: 0 },
      rectangle08: { x: 0, y: 0 },
    });
  const colorPrimaryLight = theme.palette.primary.light;
  const colorPrimaryMain = theme.palette.primary.main;
  const colorPrimaryDark = theme.palette.primary.dark;
  const colorSecondaryLight = theme.palette.secondary.light;
  const colorSecondaryMain = theme.palette.secondary.main;
  const colorSecondaryDark = theme.palette.secondary.dark;

  const emptyCircle01_anim = keyframes`50% {transform: translate3d(${svgObjectsPXtoCursor.emptyCircle01.x}px, ${svgObjectsPXtoCursor.emptyCircle01.y}px, 0px);opacity:0;}`;
  const emptyCircle02_anim = keyframes`50% {transform: translate3d(${svgObjectsPXtoCursor.emptyCircle02.x}px, ${svgObjectsPXtoCursor.emptyCircle02.y}px, 0px);opacity:0;}`;
  const emptyCircle03_anim = keyframes`50% {transform: translate3d(${svgObjectsPXtoCursor.emptyCircle03.x}px, ${svgObjectsPXtoCursor.emptyCircle03.y}px, 0px);opacity:0;}`;
  const emptyCircle04_anim = keyframes`50% {transform: translate3d(${svgObjectsPXtoCursor.emptyCircle04.x}px, ${svgObjectsPXtoCursor.emptyCircle04.y}px, 0px);opacity:0;}`;
  const emptyCircle05_anim = keyframes`50% {transform: translate3d(${svgObjectsPXtoCursor.emptyCircle05.x}px, ${svgObjectsPXtoCursor.emptyCircle05.y}px, 0px);opacity:0;}`;
  const emptyCircle06_anim = keyframes`50% {transform: translate3d(${svgObjectsPXtoCursor.emptyCircle06.x}px, ${svgObjectsPXtoCursor.emptyCircle06.y}px, 0px);opacity:0;}`;
  const emptyCircle07_anim = keyframes`50% {transform: translate3d(${svgObjectsPXtoCursor.emptyCircle07.x}px, ${svgObjectsPXtoCursor.emptyCircle07.y}px, 0px);opacity:0;}`;
  const fullCircle01_anim = keyframes`50% {transform: translate3d(${svgObjectsPXtoCursor.fullCircle01.x}px, ${svgObjectsPXtoCursor.fullCircle01.y}px, 0px);opacity:0;}`;
  const fullCircle02_anim = keyframes`50% {transform: translate3d(${svgObjectsPXtoCursor.fullCircle02.x}px, ${svgObjectsPXtoCursor.fullCircle02.y}px, 0px);opacity:0;}`;
  const fullCircle03_anim = keyframes`50% {transform: translate3d(${svgObjectsPXtoCursor.fullCircle03.x}px, ${svgObjectsPXtoCursor.fullCircle03.y}px, 0px);opacity:0;}`;
  const fullCircle04_anim = keyframes`50% {transform: translate3d(${svgObjectsPXtoCursor.fullCircle04.x}px, ${svgObjectsPXtoCursor.fullCircle04.y}px, 0px);opacity:0;}`;
  const fullCircle05_anim = keyframes`50% {transform: translate3d(${svgObjectsPXtoCursor.fullCircle05.x}px, ${svgObjectsPXtoCursor.fullCircle05.y}px, 0px);opacity:0;}`;
  const fullCircle06_anim = keyframes`50% {transform: translate3d(${svgObjectsPXtoCursor.fullCircle06.x}px, ${svgObjectsPXtoCursor.fullCircle06.y}px, 0px);opacity:0;}`;
  const fullCircle07_anim = keyframes`50% {transform: translate3d(${svgObjectsPXtoCursor.fullCircle07.x}px, ${svgObjectsPXtoCursor.fullCircle07.y}px, 0px);opacity:0;}`;
  const rectangle01_anim = keyframes`50% {transform: translate3d(${svgObjectsPXtoCursor.rectangle01.x}px, ${svgObjectsPXtoCursor.rectangle01.y}px, 0px);opacity:0;}`;
  const rectangle02_anim = keyframes`50% {transform: translate3d(${svgObjectsPXtoCursor.rectangle02.x}px, ${svgObjectsPXtoCursor.rectangle02.y}px, 0px);opacity:0;}`;
  const rectangle03_anim = keyframes`50% {transform: translate3d(${svgObjectsPXtoCursor.rectangle03.x}px, ${svgObjectsPXtoCursor.rectangle03.y}px, 0px);opacity:0;}`;
  const rectangle04_anim = keyframes`50% {transform: translate3d(${svgObjectsPXtoCursor.rectangle04.x}px, ${svgObjectsPXtoCursor.rectangle04.y}px, 0px);opacity:0;}`;
  const rectangle05_anim = keyframes`50% {transform: translate3d(${svgObjectsPXtoCursor.rectangle05.x}px, ${svgObjectsPXtoCursor.rectangle05.y}px, 0px);opacity:0;}`;
  const rectangle06_anim = keyframes`50% {transform: translate3d(${svgObjectsPXtoCursor.rectangle06.x}px, ${svgObjectsPXtoCursor.rectangle06.y}px, 0px);opacity:0;}`;
  const rectangle07_anim = keyframes`50% {transform: translate3d(${svgObjectsPXtoCursor.rectangle07.x}px, ${svgObjectsPXtoCursor.rectangle07.y}px, 0px);opacity:0;}`;
  const rectangle08_anim = keyframes`50% {transform: translate3d(${svgObjectsPXtoCursor.rectangle08.x}px, ${svgObjectsPXtoCursor.rectangle08.y}px, 0px);opacity:0;}`;

  return (
    <SvgIcon
      viewBox="0 0 800 310"
      sx={{
        width: '-webkit-fill-available',
        height: 'auto',
        ...sx,
      }}
      {...rest}
    >
      <Svg
        title="google"
        ref={svgRef}
        className={css`
          #EmptyCircle01 {animation: 2s ${emptyCircle01_anim} 0s linear alternate infinite forwards;}
          #EmptyCircle02 {animation: 2s ${emptyCircle02_anim} 0.1s linear alternate infinite forwards;}
          #EmptyCircle03 {animation: 2s ${emptyCircle03_anim} 0.2s linear alternate infinite forwards;}
          #EmptyCircle04 {animation: 2s ${emptyCircle04_anim} 0.3s linear alternate infinite forwards;}
          #EmptyCircle05 {animation: 2s ${emptyCircle05_anim} 0.4s linear alternate infinite forwards;}
          #EmptyCircle06 {animation: 2s ${emptyCircle06_anim} 0.5s linear alternate infinite forwards;}
          #EmptyCircle07 {animation: 2s ${emptyCircle07_anim} 0.6s linear alternate infinite forwards;}
          #FullCircle01 {animation: 2s ${fullCircle01_anim} 0.7s linear alternate infinite forwards;}
          #FullCircle02 {animation: 2s ${fullCircle02_anim} 0.8s linear alternate infinite forwards;}
          #FullCircle03 {animation: 2s ${fullCircle03_anim} 0.9s linear alternate infinite forwards;}
          #FullCircle04 {animation: 2s ${fullCircle04_anim} 1.0s linear alternate infinite forwards;}
          #FullCircle05 {animation: 2s ${fullCircle05_anim} 1.1s linear alternate infinite forwards;}
          #FullCircle06 {animation: 2s ${fullCircle06_anim} 1.2s linear alternate infinite forwards;}
          #FullCircle07 {animation: 2s ${fullCircle07_anim} 1.3s linear alternate infinite forwards;}
          #Rectangle01 {animation: 2s ${rectangle01_anim} 1.4s linear alternate infinite forwards;}
          #Rectangle02 {animation: 2s ${rectangle02_anim} 1.5s linear alternate infinite forwards;}
          #Rectangle03 {animation: 2s ${rectangle03_anim} 1.6s linear alternate infinite forwards;}
          #Rectangle04 {animation: 2s ${rectangle04_anim} 1.7s linear alternate infinite forwards;}
          #Rectangle05 {animation: 2s ${rectangle05_anim} 1.8s linear alternate infinite forwards;}
          #Rectangle06 {animation: 2s ${rectangle06_anim} 1.9s linear alternate infinite forwards;}
          #Rectangle07 {animation: 2s ${rectangle07_anim} 2.0s linear alternate infinite forwards;}
          #Rectangle08 {animation: 2s ${rectangle08_anim} 2.1s linear alternate infinite forwards;}
        `}
        onMouseOver={(event) => {
          if (svgRef.current) {
            const { clientX, clientY }: { clientX: number; clientY: number } =
              event;

            const baseSvgDimension = svgRef.current.getBoundingClientRect();

            const baseSvgViewBox = svgRef.current.viewBox.baseVal;

            let translateCoords = (...args: any[]) => args;

            translateCoords = createTranslator(
              baseSvgViewBox,
              baseSvgDimension,
            );
            const [x, y] = translateCoords(clientX, clientY);

            setSvgObjectsPXtoCursor({
              emptyCircle01: { x: x - (svgRef.current.getElementById("EmptyCircle01") as SVGCircleElement).cx.animVal.value, y: y - (svgRef.current.getElementById("EmptyCircle01") as SVGCircleElement).cy.animVal.value },
              emptyCircle02: { x: x - (svgRef.current.getElementById("EmptyCircle02") as SVGCircleElement).cx.animVal.value, y: y - (svgRef.current.getElementById("EmptyCircle02") as SVGCircleElement).cy.animVal.value },
              emptyCircle03: { x: x - (svgRef.current.getElementById("EmptyCircle03") as SVGCircleElement).cx.animVal.value, y: y - (svgRef.current.getElementById("EmptyCircle03") as SVGCircleElement).cy.animVal.value },
              emptyCircle04: { x: x - (svgRef.current.getElementById("EmptyCircle04") as SVGCircleElement).cx.animVal.value, y: y - (svgRef.current.getElementById("EmptyCircle04") as SVGCircleElement).cy.animVal.value },
              emptyCircle05: { x: x - (svgRef.current.getElementById("EmptyCircle05") as SVGCircleElement).cx.animVal.value, y: y - (svgRef.current.getElementById("EmptyCircle05") as SVGCircleElement).cy.animVal.value },
              emptyCircle06: { x: x - (svgRef.current.getElementById("EmptyCircle06") as SVGCircleElement).cx.animVal.value, y: y - (svgRef.current.getElementById("EmptyCircle06") as SVGCircleElement).cy.animVal.value },
              emptyCircle07: { x: x - (svgRef.current.getElementById("EmptyCircle07") as SVGCircleElement).cx.animVal.value, y: y - (svgRef.current.getElementById("EmptyCircle07") as SVGCircleElement).cy.animVal.value },
              fullCircle01: { x: x - (svgRef.current.getElementById("FullCircle01") as SVGCircleElement).cx.animVal.value, y: y - (svgRef.current.getElementById("FullCircle01") as SVGCircleElement).cy.animVal.value },
              fullCircle02: { x: x - (svgRef.current.getElementById("FullCircle02") as SVGCircleElement).cx.animVal.value, y: y - (svgRef.current.getElementById("FullCircle02") as SVGCircleElement).cy.animVal.value },
              fullCircle03: { x: x - (svgRef.current.getElementById("FullCircle03") as SVGCircleElement).cx.animVal.value, y: y - (svgRef.current.getElementById("FullCircle03") as SVGCircleElement).cy.animVal.value },
              fullCircle04: { x: x - (svgRef.current.getElementById("FullCircle04") as SVGCircleElement).cx.animVal.value, y: y - (svgRef.current.getElementById("FullCircle04") as SVGCircleElement).cy.animVal.value },
              fullCircle05: { x: x - (svgRef.current.getElementById("FullCircle05") as SVGCircleElement).cx.animVal.value, y: y - (svgRef.current.getElementById("FullCircle05") as SVGCircleElement).cy.animVal.value },
              fullCircle06: { x: x - (svgRef.current.getElementById("FullCircle06") as SVGCircleElement).cx.animVal.value, y: y - (svgRef.current.getElementById("FullCircle06") as SVGCircleElement).cy.animVal.value },
              fullCircle07: { x: x - (svgRef.current.getElementById("FullCircle07") as SVGCircleElement).cx.animVal.value, y: y - (svgRef.current.getElementById("FullCircle07") as SVGCircleElement).cy.animVal.value },
              rectangle01: { x: x - (svgRef.current.getElementById("Rectangle01") as SVGRectElement).x.animVal.value, y: y - (svgRef.current.getElementById("Rectangle01") as SVGRectElement).y.animVal.value },
              rectangle02: { x: x - (svgRef.current.getElementById("Rectangle02") as SVGRectElement).x.animVal.value, y: y - (svgRef.current.getElementById("Rectangle02") as SVGRectElement).y.animVal.value },
              rectangle03: { x: x - (svgRef.current.getElementById("Rectangle03") as SVGRectElement).x.animVal.value, y: y - (svgRef.current.getElementById("Rectangle03") as SVGRectElement).y.animVal.value },
              rectangle04: { x: x - (svgRef.current.getElementById("Rectangle04") as SVGRectElement).x.animVal.value, y: y - (svgRef.current.getElementById("Rectangle04") as SVGRectElement).y.animVal.value },
              rectangle05: { x: x - (svgRef.current.getElementById("Rectangle05") as SVGRectElement).x.animVal.value, y: y - (svgRef.current.getElementById("Rectangle05") as SVGRectElement).y.animVal.value },
              rectangle06: { x: x - (svgRef.current.getElementById("Rectangle06") as SVGRectElement).x.animVal.value, y: y - (svgRef.current.getElementById("Rectangle06") as SVGRectElement).y.animVal.value },
              rectangle07: { x: x - (svgRef.current.getElementById("Rectangle07") as SVGRectElement).x.animVal.value, y: y - (svgRef.current.getElementById("Rectangle07") as SVGRectElement).y.animVal.value },
              rectangle08: { x: x - (svgRef.current.getElementById("Rectangle08") as SVGRectElement).x.animVal.value, y: y - (svgRef.current.getElementById("Rectangle08") as SVGRectElement).y.animVal.value },
            })

          }
        }}
      />
    </SvgIcon>
  );
};

export default GoogleBannerSVG;
