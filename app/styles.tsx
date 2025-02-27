import { COLORS, SPACING } from "@/theme";
import { StyleSheet } from "react-native";
// import { SPACING } from '../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.md,
    backgroundColor: COLORS.background
  },
  section: {
    marginVertical: SPACING.lg
  },
  padding: {
    padding: SPACING.xl
  }
});

export default styles;