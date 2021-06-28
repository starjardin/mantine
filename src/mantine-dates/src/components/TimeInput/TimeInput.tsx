import React, { useState, useRef } from 'react';
import {
  InputBaseProps,
  InputWrapperBaseProps,
  InputStylesNames,
  InputWrapperStylesNames,
  DefaultProps,
  Input,
  InputWrapper,
  MantineSize,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { clamp, useId } from '@mantine/hooks';
import useStyles from './TimeInput.styles';

export type TimeInputStylesNames =
  | keyof ReturnType<typeof useStyles>
  | InputStylesNames
  | InputWrapperStylesNames;

interface TimeInputProps
  extends DefaultProps<TimeInputStylesNames>,
    InputBaseProps,
    InputWrapperBaseProps,
    React.ComponentPropsWithoutRef<'div'> {
  /** Input size */
  size?: MantineSize;
}

interface CreateTimeHandler {
  onChange(value: string): void;
  onChangeEnd?(): void;
  nextRef?: React.RefObject<HTMLInputElement>;
  min: number;
  max: number;
  maxValue: number;
}

function padTime(value: number) {
  return value > 10 ? value.toString() : `0${value}`;
}

function createTimeHandler({
  onChange,
  onChangeEnd,
  nextRef,
  min,
  max,
  maxValue,
}: CreateTimeHandler) {
  return (value: string) => {
    if (value === '00') {
      onChange('00');
      nextRef?.current.focus();
      nextRef?.current.select();
      typeof onChangeEnd === 'function' && onChangeEnd();
      return null;
    }

    const parsed = parseInt(value, 10);

    if (Number.isNaN(parsed)) {
      return null;
    }

    if (parsed > maxValue) {
      onChange(padTime(clamp({ value: parsed, min, max })));
      nextRef?.current.focus();
      nextRef?.current.select();
      typeof onChangeEnd === 'function' && onChangeEnd();
      return null;
    }

    onChange(parsed.toString());
    return null;
  };
}

export function TimeInput({
  required,
  label,
  error,
  description,
  className,
  style,
  themeOverride,
  size = 'sm',
  wrapperProps,
  classNames,
  styles,
  id,
  ...others
}: TimeInputProps) {
  const theme = useMantineTheme(themeOverride);
  const classes = useStyles({ theme, size }, classNames as any, 'time-input');
  const uuid = useId(id);
  const hoursRef = useRef<HTMLInputElement>();
  const minutesRef = useRef<HTMLInputElement>();
  const secondsRef = useRef<HTMLInputElement>();
  const [hours, setHours] = useState('12');
  const [minutes, setMinutes] = useState('12');
  const [seconds, setSeconds] = useState('12');

  const handleHoursChange = createTimeHandler({
    onChange: setHours,
    min: 0,
    max: 23,
    maxValue: 2,
    nextRef: minutesRef,
  });

  const handleMinutesChange = createTimeHandler({
    onChange: setMinutes,
    min: 0,
    max: 59,
    maxValue: 5,
    nextRef: secondsRef,
  });

  const handleSecondsChange = createTimeHandler({
    onChange: setSeconds,
    min: 0,
    max: 59,
    maxValue: 5,
  });

  return (
    <InputWrapper
      required={required}
      label={label}
      error={error}
      description={description}
      className={className}
      style={style}
      themeOverride={themeOverride}
      classNames={classNames as any}
      styles={styles as any}
      size={size}
      __staticSelector="time-input"
      id={uuid}
      {...wrapperProps}
    >
      <Input
        component="div"
        __staticSelector="time-input"
        themeOverride={themeOverride}
        required={required}
        invalid={!!error}
        onClick={() => hoursRef.current.focus()}
        {...others}
      >
        <div className={classes.controls}>
          <input
            id={uuid}
            ref={hoursRef}
            className={classes.timeInput}
            onFocus={() => hoursRef.current.select()}
            onBlur={(event) => setHours(padTime(parseInt(event.currentTarget.value, 10)))}
            type="text"
            value={hours.toString()}
            onClick={(event) => event.stopPropagation()}
            onChange={(event) => handleHoursChange(event.currentTarget.value)}
          />
          <Text size={size} style={{ lineHeight: 1 }}>
            :
          </Text>
          <input
            ref={minutesRef}
            onFocus={() => minutesRef.current.select()}
            onBlur={(event) => setMinutes(padTime(parseInt(event.currentTarget.value, 10)))}
            className={classes.timeInput}
            type="text"
            value={minutes}
            onClick={(event) => event.stopPropagation()}
            onChange={(event) => handleMinutesChange(event.currentTarget.value)}
          />
          <Text size={size} style={{ lineHeight: 1 }}>
            :
          </Text>
          <input
            ref={secondsRef}
            onFocus={() => secondsRef.current.select()}
            onBlur={(event) => setSeconds(padTime(parseInt(event.currentTarget.value, 10)))}
            className={classes.timeInput}
            type="text"
            value={seconds}
            onClick={(event) => event.stopPropagation()}
            onChange={(event) => handleSecondsChange(event.currentTarget.value)}
          />
        </div>
      </Input>
    </InputWrapper>
  );
}

TimeInput.displayName = '@mantine/dates/TimeInput';
