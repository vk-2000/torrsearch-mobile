import React from 'react';
import {Text} from 'react-native';

const TextHighlight = ({
  text,
  highlightText,
  textColor,
  hightlightColor,
  style,
}) => {
  return (
    <Text style={style}>
      {text.split(highlightText).map((item, i) => {
        return (
          <Text key={i}>
            <Text style={{color: textColor}}>{item}</Text>
            {i !== text.split(highlightText).length - 1 && (
              <Text style={{color: hightlightColor}}>{highlightText}</Text>
            )}
          </Text>
        );
      })}
    </Text>
  );
};

export default TextHighlight;
