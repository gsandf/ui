import React from 'react';
import styled, { useTheme } from 'styled-components';

export default {
  title: 'Theme/Colors'
};

const ColorPalette = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1em;
`;

const SpecimenColor = styled.div<{ color: string }>`
  background-color: ${p => p.color};
  min-height: ${p => p.theme.space[6]};
  min-width: ${p => p.theme.space[6]};
`;

const SpecimenLabel = styled.div`
  border-top: ${p => p.theme.borders.card};
  padding: ${p => p.theme.space[2]};
`;

const Specimen = styled.div`
  box-shadow: ${p => p.theme.shadows.default};
  display: flex;
  flex-direction: column;
`;

export const Colors = () => {
  const { colors } = useTheme();

  function getColorNames(): { color: string; names: string[] }[] {
    const uniqueColors = Object.entries(colors).reduce(
      (colorList, [name, value]) => {
        return {
          ...colorList,
          [value]: {
            color: value,
            names: (colorList[value]?.names ?? []).concat(name)
          }
        };
      },
      {}
    );

    return Object.values(uniqueColors);
  }

  return (
    <ColorPalette>
      {getColorNames().map(({ color, names }) => (
        <Specimen>
          <SpecimenColor color={color} />
          <SpecimenLabel>
            {color}
            <br />
            {names.join(', ')}
          </SpecimenLabel>
        </Specimen>
      ))}
    </ColorPalette>
  );
};
