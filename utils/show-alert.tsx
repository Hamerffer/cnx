import { Alert } from "react-native";

type showAlertProps = {
  title: string;
  message: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
};

export const showAlert = ({
  title,
  message,
  onConfirm,
  confirmText = "Yes",
  cancelText = "No",
}: showAlertProps) => {
  Alert.alert(title, message, [
    { text: cancelText, style: "cancel" },
    { text: confirmText, onPress: onConfirm },
  ]);
};
