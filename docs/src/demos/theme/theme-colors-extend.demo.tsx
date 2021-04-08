import React from 'react';
import { ElementsGroup, Button, Badge, Switch } from '@mantine/core';
import { MantineProvider } from '@mantine/theme';
import CodeDemo from '../../components/CodeDemo/CodeDemo';

const code = `import React from 'react';
import { Button } from '@mantine/core';

function ColorExtendDemo() {
  return (
    <MantineProvider theme={{
      colors: {
        'deep-blue': ['#E9EDFC', '#C1CCF6', '#99ABF0', '#7189EA', '#4968E4', '#2147DE', '#1A39B2', '#142B85', '#0D1D59', '#070E2C'],
        asphalt: ['#F0F4F5', '#D4E0E2', '#B9CCD0', '#9EB8BD', '#82A4AB', '#679098', '#52747A', '#3E575B', '#293A3D', '#151D1E']
      },
    }}>
      <Button color="deep-blue">Deep blue button</Button>
      
      <Badge color="asphalt" variant="filled">
        Asphalt badge
      </Badge>
      
      <Switch
        color="deep-blue"
        label="Deep blue switch"
        defaultChecked
      />
    </MantineProvider>
  );
}`;

export function ThemeColorExtendDemo() {
  return (
    <CodeDemo code={code} language="tsx">
      <MantineProvider
        theme={{
          colors: {
            'deep-blue': [
              '#E9EDFC',
              '#C1CCF6',
              '#99ABF0',
              '#7189EA',
              '#4968E4',
              '#2147DE',
              '#1A39B2',
              '#142B85',
              '#0D1D59',
              '#070E2C',
            ],

            asphalt: [
              '#F0F4F5',
              '#D4E0E2',
              '#B9CCD0',
              '#9EB8BD',
              '#82A4AB',
              '#679098',
              '#52747A',
              '#3E575B',
              '#293A3D',
              '#151D1E',
            ],
          },
        }}
      >
        <ElementsGroup position="center">
          <Button color="deep-blue">Deep blue button</Button>
          <Badge color="asphalt" variant="filled">
            Asphalt badge
          </Badge>
          <Switch
            color="deep-blue"
            label="Deep blue switch"
            defaultChecked
            wrapperProps={{ 'data-mantine-composable': true }}
          />
        </ElementsGroup>
      </MantineProvider>
    </CodeDemo>
  );
}