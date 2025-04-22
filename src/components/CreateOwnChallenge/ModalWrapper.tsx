import { View, ViewStyle, Modal } from 'react-native'
import React from 'react'
import { ThemedStyle } from '@/theme'
import { useAppTheme } from '@/utils/useAppTheme';
import ActionButton from '../UI/ActionModal/ActionButton';
import { Text } from '../Text';

type Props = {
    visible: boolean;
    setVisible: () => void;
    title: string;
    children: React.ReactNode;
}

const ModalWrapper = ({ visible, children, setVisible, title }: Props) => {
    const { themed } = useAppTheme()
    return (
        <Modal visible={visible} animationType="slide" transparent statusBarTranslucent>
            <View style={themed($modalWrapper)}>
                <View style={themed($modalBackground)}>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginTop: 24
                        }}
                    >
                        <ActionButton icon="x" onPress={setVisible} />
                        <Text size="lg" weight="semiBold">
                            {title}
                        </Text>
                    </View>
                    <View
                        style={{
                            flex: 1,
                        }}
                    >
                        {children}
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ModalWrapper


const $modalWrapper: ThemedStyle<ViewStyle> = ({ colors }) => ({
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
    backgroundColor: colors.palette.overlay20,

})

const $modalBackground: ThemedStyle<ViewStyle> = ({ colors }) => ({
    backgroundColor: colors.background,
    height: "100%",
})
