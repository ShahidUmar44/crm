import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  Platform,
  Keyboard,
  StyleSheet,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';

import SmallButton from '../buttons/SmallButton';
import { colors, typography } from '../../theme';

export function useAlertControl() {
  const [state, setAlert] = useState({
    visible: false,
    title: undefined,
    message: undefined,
    onClose: () => {},
  });

  const alert = (title, message, onClose = () => {}) => {
    setAlert({
      visible: true,
      title,
      message,
      onClose,
    });
  };

  const close = () => {
    if (state.onClose) state.onClose();
    setAlert({
      visible: false,
      title: undefined,
      message: undefined,
      onClose: () => {},
    });
  };

  return {
    alert,
    state,
    close,
  };
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ALERT_WIDTH = SCREEN_WIDTH - SCREEN_WIDTH / 16;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.semiTransparentBorder,
  },
  titleWrapper: {
    height: 56,
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'center',
    backgroundColor: colors.primaryDarker,
  },
  content: {
    borderRadius: 10,
    width: ALERT_WIDTH,

    flexDirection: 'column',
    borderColor: colors.transparent,
    backgroundColor: colors.whiteBackground,
  },
  title: {
    color: colors.text,
    textAlign: 'center',
    fontSize: typography.FONT_SIZE_18,
    fontFamily: typography.secondary,
  },
  messageWrapper: {
    marginTop: 10,
    alignItems: 'center',
  },
  message: {
    color: colors.primaryDarker,
    fontFamily: typography.primary,
  },
  row: {
    flexDirection: 'row',
  },
  buttonRow: {
    marginTop: 24,
    marginBottom: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

const defaultButtonRow = control => (
  <SmallButton text="OK" onPress={() => control.close()} color={colors.primary} textColor={colors.lightColor} />
);

export const alertDecisionButtonRow =
  (onAccept, onCancel) =>
  ({ close }) =>
    (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <SmallButton
          text="OK"
          onPress={() => {
            if (onAccept) onAccept();
            close();
          }}
          color={colors.primary}
          textColor={colors.lightColor}
        />
        <SmallButton
          text="CANCEL"
          onPress={() => {
            if (onCancel) onCancel();
            close();
          }}
          color={colors.lightColor}
          textColor={colors.textColor}
        />
      </View>
    );

const HomebaseAlert = ({
  control,
  children,
  type = 'info',
  renderDefaultButton = true,
  renderButtonRow = defaultButtonRow,
}) => {
  const { state } = control;

  return (
    <Modal visible={state.visible} animationType="fade" transparent>
      <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
          <View style={styles.container}>
            <View style={styles.content}>
              <ScrollView>
                <View style={styles.titleWrapper}>
                  {state.title && (
                    <View style={styles.row}>
                      <Text style={styles.title}>{state.title || ''}</Text>
                    </View>
                  )}
                </View>
                {state.message && (
                  <View style={styles.messageWrapper}>
                    <Text style={styles.message}>{state.message || ''}</Text>
                  </View>
                )}
                {children && <View style={styles.row}>{children}</View>}
                {renderDefaultButton && <View style={styles.buttonRow}>{renderButtonRow(control, type)}</View>}
              </ScrollView>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default HomebaseAlert;
