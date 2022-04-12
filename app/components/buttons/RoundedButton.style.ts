import { StyleSheet } from "react-native";
import { bColors, bMargin, bPadding } from "../../styles/base";
import { RoundedButtonProps } from "./RoundedButton";

/** 버튼 타입과 관계없는 기본 레이아웃에 대한 스타일 */
export const buttonLayoutStyles = StyleSheet.create({
  buttonBorder: { borderRadius: 8, overflow: "hidden" },
  buttonBody: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

/** 버튼 타입 별 색상 지정 */
const colorsetByTypes = {
  enabledBorder: {
    bgColor: bColors.white,
    bdColor: bColors.black,
    txColor: bColors.black,
  },
  enabledDark: {
    bgColor: bColors.black,
    bdColor: bColors.black,
    txColor: bColors.white,
  },
  disabled: {
    bgColor: bColors.greyTetiary,
    bdColor: bColors.greyTetiary,
    txColor: bColors.greyTetiary,
  },
  primary: {
    bgColor: bColors.transparent,
    bdColor: bColors.transparent,
    txColor: bColors.white,
  },
  white: {
    bgColor: bColors.white,
    bdColor: bColors.white,
    txColor: bColors.black,
  },
};
/** 버튼 타입등 프로퍼티에 영향을 받는 스타일 */
export const buttonInsideStyles = (props: RoundedButtonProps) => {
  const colorSet = colorsetByTypes[props.buttonType];
  const rtStyle = {
    ...StyleSheet.create({
      buttonInside: {
        backgroundColor: colorSet.bgColor,
        alignItems: "flex-start",
        justifyContent: "center",
        borderRadius: 8,
        width: "100%",
        height: "100%",
        borderWidth: bPadding.small,
        borderColor: colorSet.bdColor,
      },
      buttonImage: {
        height: props.iconData?.iconSize
          ? props.iconData.iconSize
          : props.fontSize,
        width: props.iconData?.iconSize
          ? props.iconData.iconSize
          : props.fontSize,
        alignSelf: "center",
      },
      buttonIcon: {
        fontSize: props.iconData?.iconSize
          ? props.iconData.iconSize
          : props.fontSize,
      },
      buttonText: {
        textAlign: "center",
        color: colorSet.txColor,
        fontSize: props.fontSize,
        fontWeight: props.bold ? "bold" : "normal",
      },
      gradientBackground: {
        position: "absolute",
        width: "100%",
        height: "100%",
      },
      verticalLine: {
        alignSelf: "center",
        height: "80%",
        width: 1,
        backgroundColor: colorSet.txColor,
      },
      rowFlexContainer: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        flexDirection: "row",
      },
      rowFlexItem: {
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: bMargin.small,
      },
      rowFlexIcon: {},
      rowFlexText: {
        width: "100%",
        flex: 1,
      },
    }),
    primaryGradient: {
      colors: [bColors.tetiary, bColors.primary],
      start: { x: 0, y: 1 },
      end: { x: 1, y: 0 },
    },
  };

  return rtStyle;
};
