import * as React from 'react';
import {
  Animated,
  Easing,
  LayoutChangeEvent,
  ScrollView,
  StyleProp,
  View,
  ViewStyle,
  Platform,
  Text,
} from 'react-native';

// interface Props {
//   children: React.ReactElement<any>;
//   style?: StyleProp<ViewStyle>;
//   endPaddingWidth?: number;
//   duration?: number;
//   delay?: number;
//   isLTR?: boolean;
// }
const delay = 2000;
const AutoScrolling = props => {
  const [isAutoScrollEnabled, setIsAutoScrollEnabled] = React.useState(false);
  const [dividerWidth, setDividerWidth] = React.useState(props.endPaddingWidth);
  const containerWidth = React.useRef(0);
  const contentWidth = React.useRef(0);
  const offsetX = React.useRef(new Animated.Value(0));
  const contentRef = React.useRef(null);

  React.useEffect(() => {
    return () => {
      contentRef.current = null;
    };
  });

  const measureContainerView = React.useCallback(
    ({
      nativeEvent: {
        layout: {width},
      },
    }) => {
      if (containerWidth.current === width) return;
      containerWidth.current = width;
      if (!contentRef.current) return;
      contentRef.current.measure((fx, _fy, width) => {
        checkContent(width, fx);
      });
    },
    [checkContent],
  );

  const checkContent = React.useCallback((newContentWidth, fx) => {
    if (!newContentWidth) {
      setIsAutoScrollEnabled(false);
      return;
    }

    if (contentWidth.current === newContentWidth) return;
    contentWidth.current = newContentWidth;
    let newDividerWidth = props.endPaddingWidth;
    if (contentWidth.current < containerWidth.current) {
      if (
        props.endPaddingWidth <
        containerWidth.current - contentWidth.current
      ) {
        newDividerWidth = containerWidth.current - contentWidth.current;
      }
    }
    setDividerWidth(newDividerWidth);
    setIsAutoScrollEnabled(true);

    if (props.isLTR) {
      offsetX.current.setValue(-(newContentWidth + newDividerWidth));
    }
    Animated.loop(
      Animated.timing(offsetX.current, {
        toValue: props.isLTR
          ? fx
          : -(contentWidth.current + fx + newDividerWidth),
        duration: props.duration || 50 * contentWidth.current,
        delay,
        easing: Easing.linear,
        useNativeDriver: Platform.OS === 'web' ? false : true,
      }),
    ).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const childrenCloned = React.useMemo(
    () =>
      React.cloneElement({
        // eslint-disable-next-line no-undef

        onLayout: ({
          nativeEvent: {
            layout: {width, x},
          },
        }) => {
          if (!containerWidth.current || width === contentWidth.current) return;
          offsetX.current.stopAnimation();
          offsetX.current.setValue(0);
          offsetX.current.setOffset(0);
          checkContent(width, x);
        },
        ref: ref => (contentRef.current = ref),
      }),
    [checkContent],
  );

  return (
    <View onLayout={measureContainerView} style={props.style}>
      <ScrollView
        horizontal={true}
        bounces={false}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}>
        <Animated.View
          style={[
            {flexDirection: 'row'},
            {transform: [{translateX: offsetX.current}]},
          ]}>
          {childrenCloned}
          {isAutoScrollEnabled && (
            <>
              <View style={{width: dividerWidth}}>
                <Text>jjjjjj</Text>
              </View>
            </>
          )}
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default AutoScrolling;
