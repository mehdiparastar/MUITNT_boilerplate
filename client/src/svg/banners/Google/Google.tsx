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
    console.log('x');
    return [x, y];
  };

const GoogleBannerSVG: React.FC<SvgIconProps> = ({ sx, ...rest }) => {
  const theme = useTheme();
  const svgRef = useRef<SVGSVGElement>(null);
  const [mousePos, setMousePos] = useState<ImousePos>({ x: 0, y: 0 });
  const [emptyCircle01TranslateValues, setEmptyCircle01TranslateValues] =
    useState({ x: 0, y: 0 });
  const colorPrimaryLight = theme.palette.primary.light;
  const colorPrimaryMain = theme.palette.primary.main;
  const colorPrimaryDark = theme.palette.primary.dark;
  const colorSecondaryLight = theme.palette.secondary.light;
  const colorSecondaryMain = theme.palette.secondary.main;
  const colorSecondaryDark = theme.palette.secondary.dark;

  const circle_anim = keyframes`
 
  100% {
      transform: translate3d(${emptyCircle01TranslateValues.x}px, ${emptyCircle01TranslateValues.y}px, 0px);
  }
`;

  useEffect(() => {
    if (svgRef.current) {
      const baseSvgDimension = svgRef.current.getBoundingClientRect();

      const baseSvgViewBox = svgRef.current.viewBox.baseVal;
      let translateCoords = (...args: any[]) => args;
      translateCoords = createTranslator(baseSvgViewBox, baseSvgDimension);
      const [
        emptyCircle01Dimension,
        emptyCircle02Dimension,
        emptyCircle03Dimension,
        emptyCircle04Dimension,
        emptyCircle05Dimension,
        emptyCircle06Dimension,
        emptyCircle07Dimension,
        fullCircle01Dimension,
        fullCircle02Dimension,
        fullCircle03Dimension,
        fullCircle04Dimension,
        fullCircle05Dimension,
        fullCircle06Dimension,
        fullCircle07Dimension,
        rectangle01Dimension,
        rectangle02Dimension,
        rectangle03Dimension,
        rectangle04Dimension,
        rectangle05Dimension,
        rectangle06Dimension,
        rectangle07Dimension,
        rectangle08Dimension,
      ] = [
        svgRef.current.getElementById('EmptyCircle01').getBoundingClientRect(),
        svgRef.current.getElementById('EmptyCircle02').getBoundingClientRect(),
        svgRef.current.getElementById('EmptyCircle03').getBoundingClientRect(),
        svgRef.current.getElementById('EmptyCircle04').getBoundingClientRect(),
        svgRef.current.getElementById('EmptyCircle05').getBoundingClientRect(),
        svgRef.current.getElementById('EmptyCircle06').getBoundingClientRect(),
        svgRef.current.getElementById('EmptyCircle07').getBoundingClientRect(),
        svgRef.current.getElementById('FullCircle01').getBoundingClientRect(),
        svgRef.current.getElementById('FullCircle02').getBoundingClientRect(),
        svgRef.current.getElementById('FullCircle03').getBoundingClientRect(),
        svgRef.current.getElementById('FullCircle04').getBoundingClientRect(),
        svgRef.current.getElementById('FullCircle05').getBoundingClientRect(),
        svgRef.current.getElementById('FullCircle06').getBoundingClientRect(),
        svgRef.current.getElementById('FullCircle07').getBoundingClientRect(),
        svgRef.current.getElementById('Rectangle01').getBoundingClientRect(),
        svgRef.current.getElementById('Rectangle02').getBoundingClientRect(),
        svgRef.current.getElementById('Rectangle03').getBoundingClientRect(),
        svgRef.current.getElementById('Rectangle04').getBoundingClientRect(),
        svgRef.current.getElementById('Rectangle05').getBoundingClientRect(),
        svgRef.current.getElementById('Rectangle06').getBoundingClientRect(),
        svgRef.current.getElementById('Rectangle07').getBoundingClientRect(),
        svgRef.current.getElementById('Rectangle08').getBoundingClientRect(),
      ];

      const [
        emptyCircle01TranslateCoordinate,
        emptyCircle02TranslateCoordinate,
        emptyCircle03TranslateCoordinate,
        emptyCircle04TranslateCoordinate,
        emptyCircle05TranslateCoordinate,
        emptyCircle06TranslateCoordinate,
        emptyCircle07TranslateCoordinate,
        fullCircle01TranslateCoordinate,
        fullCircle02TranslateCoordinate,
        fullCircle03TranslateCoordinate,
        fullCircle04TranslateCoordinate,
        fullCircle05TranslateCoordinate,
        fullCircle06TranslateCoordinate,
        fullCircle07TranslateCoordinate,
        rectangle01TranslateCoordinate,
        rectangle02TranslateCoordinate,
        rectangle03TranslateCoordinate,
        rectangle04TranslateCoordinate,
        rectangle05TranslateCoordinate,
        rectangle06TranslateCoordinate,
        rectangle07TranslateCoordinate,
        rectangle08TranslateCoordinate,
      ] = [
        translateCoords(emptyCircle01Dimension.x, emptyCircle01Dimension.y),
        translateCoords(emptyCircle02Dimension.x, emptyCircle02Dimension.y),
        translateCoords(emptyCircle03Dimension.x, emptyCircle03Dimension.y),
        translateCoords(emptyCircle04Dimension.x, emptyCircle04Dimension.y),
        translateCoords(emptyCircle05Dimension.x, emptyCircle05Dimension.y),
        translateCoords(emptyCircle06Dimension.x, emptyCircle06Dimension.y),
        translateCoords(emptyCircle07Dimension.x, emptyCircle07Dimension.y),
        translateCoords(fullCircle01Dimension.x, fullCircle01Dimension.y),
        translateCoords(fullCircle02Dimension.x, fullCircle02Dimension.y),
        translateCoords(fullCircle03Dimension.x, fullCircle03Dimension.y),
        translateCoords(fullCircle04Dimension.x, fullCircle04Dimension.y),
        translateCoords(fullCircle05Dimension.x, fullCircle05Dimension.y),
        translateCoords(fullCircle06Dimension.x, fullCircle06Dimension.y),
        translateCoords(fullCircle07Dimension.x, fullCircle07Dimension.y),
        translateCoords(rectangle01Dimension.x, rectangle01Dimension.y),
        translateCoords(rectangle02Dimension.x, rectangle02Dimension.y),
        translateCoords(rectangle03Dimension.x, rectangle03Dimension.y),
        translateCoords(rectangle04Dimension.x, rectangle04Dimension.y),
        translateCoords(rectangle05Dimension.x, rectangle05Dimension.y),
        translateCoords(rectangle06Dimension.x, rectangle06Dimension.y),
        translateCoords(rectangle07Dimension.x, rectangle07Dimension.y),
        translateCoords(rectangle08Dimension.x, rectangle08Dimension.y),
      ];

      setEmptyCircle01TranslateValues({
        x: mousePos.x - emptyCircle01TranslateCoordinate[0],
        y: mousePos.y - emptyCircle01TranslateCoordinate[1],
      });
    }
  }, [mousePos]);

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
          #EmptyCircle01 {
            animation: 2s ${circle_anim} 0s linear forwards;
          }
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
            setMousePos({
              x: x,
              y: y,
            });
          }
        }}
      />
    </SvgIcon>
  );
};

export default GoogleBannerSVG;
