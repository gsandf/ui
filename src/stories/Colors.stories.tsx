import React from 'react';
import styled, { useTheme } from 'styled-components';
import { BasicGrid } from '../components/Layout/BasicGrid';

export default {
  title: 'Theme/Colors'
};

const SpecimenColor = styled.div<{ color: string }>`
  background-color: ${p => p.color};
  min-height: ${p => p.theme.space[16]};
  min-width: ${p => p.theme.space[16]};
`;

const SpecimenLabel = styled.div`
  border-top-color: ${p => p.theme.colors.gray700};
  border-top-style: solid;
  border-top-width: 1px;
  padding: ${p => p.theme.space[2]};
`;

const Specimen = styled.div`
  box-shadow: 0 0 8px 0 ${p => p.theme.colors.gray700};
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
    <BasicGrid columns={3} spacing="1.5em">
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
    </BasicGrid>
  );
};
