import {
  itRendersChildren,
  itSupportsClassName,
  itSupportsOthers,
  itSupportsStyle,
} from '@mantine/tests';
import { Mark } from './Mark';

const defaultProps = {
  children: 'test-mark',
};

describe('@mantine/core/Mark', () => {
  itRendersChildren(Mark, defaultProps);
  itSupportsClassName(Mark, defaultProps);
  itSupportsOthers(Mark, defaultProps);
  itSupportsStyle(Mark, defaultProps);

  it('has correct displayName', () => {
    expect(Mark.displayName).toEqual('@mantine/core/Mark');
  });
});
