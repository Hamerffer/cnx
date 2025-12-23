import Button from "@/components/button";
import { colors } from "@/constants/theme";
import { scale, verticalScale } from "@/utils/styling";
import { X } from "lucide-react-native";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
};

const OpenDemoModal = ({ visible, onClose }: Props) => {
  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [slideAnim, visible]);

  return (
    <Modal transparent visible={visible} animationType="fade">
      {/* Overlay */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      {/* Modal Card */}
      <Animated.View
        style={[
          styles.card,
          {
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Open a demo account</Text>
          <TouchableWithoutFeedback onPress={onClose}>
            <View style={styles.closeBtn}>
              <X size={scale(18)} color={colors.textSecondary} />
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View style={styles.divider} />

        {/* Content */}
        <Text style={styles.company}>Cnx Trade.</Text>
        <Text style={styles.link}>www.cnxtrade.com</Text>

        <Text style={styles.description}>
          By opening an account, you agree to the account opening terms and to
          the data protection policy of Cnx Trade.
        </Text>

        {/* CTA */}
        <Button style={styles.button}>
          <Text style={styles.btnText}>Open an Account</Text>
        </Button>

        <Text style={styles.note}>
          To trade using real money, you need to apply for a real trading
          account by entering into a separate agreement with a financial
          services company.
        </Text>
      </Animated.View>
    </Modal>
  );
};

export default OpenDemoModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  card: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: colors.surface,
    borderTopLeftRadius: scale(16),
    borderTopRightRadius: scale(16),
    padding: scale(16),
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    color: colors.white,
    fontSize: scale(16),
    fontWeight: "600",
  },

  closeBtn: {
    padding: scale(6),
  },

  divider: {
    height: 1,
    backgroundColor: "#3a3f45",
    marginVertical: verticalScale(12),
  },

  company: {
    color: colors.white,
    fontSize: scale(14),
    fontWeight: "500",
  },

  link: {
    color: colors.primary,
    fontSize: scale(13),
    marginBottom: verticalScale(10),
  },

  description: {
    color: "#b0b3b8",
    fontSize: scale(13),
    lineHeight: scale(18),
    marginBottom: verticalScale(16),
  },

  button: {
    marginVertical: verticalScale(12),
  },

  btnText: {
    color: colors.textPrimary,
    fontSize: scale(15),
    fontWeight: "600",
  },

  note: {
    color: "#9aa0a6",
    fontSize: scale(12),
    lineHeight: scale(16),
  },
});
