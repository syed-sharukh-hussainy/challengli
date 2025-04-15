import { Screen, Text } from '@/components';
import ActionButton from '@/components/UI/ActionModal/ActionButton';
import FooterButton from '@/components/UI/FooterButton';
import LoadingAnimation from '@/components/UI/LoadingAnimation';
import SmartImage from '@/components/UI/SmartImage';
import TopBar from '@/components/UI/TopBar';
import useRevenueCat from '@/hooks/useRevenueCat';
import { ThemedStyle } from '@/theme';
import { useAppTheme } from '@/utils/useAppTheme';
import { FontAwesome6 } from '@expo/vector-icons';
import { router } from 'expo-router';
import { t } from 'i18next';
import React, { useState } from 'react';
import { View, Button, Alert, TextStyle, ViewStyle, ScrollView, TouchableOpacity, } from 'react-native';
import Purchases, { PurchasesPackage } from 'react-native-purchases';

const features = [
    {
        title: "Unlock All Categories",
        description: "Access a wide range of categories to challenge yourself and build a habit",
        imageKey: 'total-challenges.png'
    },
    {
        title: "Track Your Daily Streaks",
        description: "Track your daily streaks and see how far you've come",
        imageKey: 'best-streak.png'
    },
    {
        title: "Follow Friends & Stay Inspired",
        description: "See what challenges your friends are taking and encourage each other to stay on track.",
        imageKey: 'best-streak.png'
    },
    {
        title: "Unlock Achievements",
        description: "Complete challenges and milestones to earn badges—only visible to Pro users!",
        imageKey: 'achievements-unlocked.png'
    }
]

export default function SubscriptionScreen() {
    const [isPurchasing, setIsPurchasing] = useState(false);
    const { currentOffering } = useRevenueCat();
    const [selectedPackage, setSelectedPackage] = useState("Annual");
    const { theme, themed } = useAppTheme();

    const purchase = async (pkg: PurchasesPackage | null) => {
        if (!pkg) {
            return;
        }
        try {
            setIsPurchasing(true);

            const purchaserInfo = await Purchases.purchasePackage(pkg);
            const isPro = purchaserInfo.customerInfo.entitlements.active['Pro'];
            if (isPro) {
                Alert.alert('Success', 'You are now a Pro user!');
                router.back();
            } else {
                Alert.alert('Error', 'Purchase failed. Try again later.');
            }
            setIsPurchasing(false);
        } catch (error) {
            if (error) {
                Alert.alert('Error', 'Purchase failed. Try again later.');
            }
        } finally {
            setIsPurchasing(false);
        }
    };


    return (
        <Screen safeAreaEdges={["top"]} contentContainerStyle={{
            flex: 1
        }}>

            <ScrollView contentContainerStyle={{
            }}>
                {isPurchasing || !currentOffering ? <LoadingAnimation /> : <>

                    <ActionButton
                        icon="x"
                        onPress={() => router.back()}
                    />
                    <View style={{
                        padding: 20
                    }}>
                        <View style={$header}>
                            <SmartImage imgKey="boarding1.png" width={100} height={100} style={{ marginBottom: 24 }} />
                            <Text style={themed($title)} size="lg" weight='semiBold'>Get Challengli Pro</Text>
                            <Text style={themed($subtitle)} size="sm" weight='medium'>Your Next Step to Better Habits</Text>
                        </View>

                        <View style={{
                            marginTop: 40,
                        }}>
                            {currentOffering.monthly && <TouchableOpacity activeOpacity={0.7} onPress={() => setSelectedPackage("Monthly")} style={[themed($common), themed($monthly)]}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: 8,
                                }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        gap: 12
                                    }}>
                                        <View style={{
                                            width: 24,
                                            height: 24,
                                            borderRadius: 100,
                                            backgroundColor: selectedPackage === "Monthly" ? theme.colors.palette.primary : theme.colors.palette.muted,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                            {selectedPackage === "Monthly" && <FontAwesome6 name="check" size={14} color="white" />}
                                        </View>
                                        <Text weight='semiBold'>
                                            Monthly
                                        </Text>
                                    </View>
                                </View>
                                <Text style={themed(({ colors, spacing }) => ({
                                    backgroundColor: colors.palette.muted,
                                    paddingHorizontal: spacing.xs,
                                    paddingVertical: spacing.xxs,
                                    borderRadius: 7,
                                }))} size="xs" weight='medium'>{currentOffering.monthly.product.priceString}</Text>
                            </TouchableOpacity>
                            }
                            {currentOffering.annual && <TouchableOpacity activeOpacity={0.7} onPress={() => setSelectedPackage("Annual")} style={[themed($common), themed($annual)]}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: 12
                                }}>
                                    <View style={{
                                        width: 24,
                                        height: 24,
                                        borderRadius: 100,
                                        backgroundColor: selectedPackage === "Annual" ? theme.colors.palette.primary : theme.colors.palette.muted,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        {selectedPackage === "Annual" && <FontAwesome6 name="check" size={14} color="white" />}
                                    </View>
                                    <Text weight='semiBold'>
                                        Annual
                                    </Text>
                                </View>
                                <View>
                                    <Text style={{
                                        position: 'absolute',
                                        top: -18,
                                        left: -30,
                                        transform: [{ rotate: '-24deg' }], // Rotate the text by 20 degrees counterclockwise
                                        backgroundColor: theme.colors.palette.primary,
                                        zIndex: 1,
                                        paddingHorizontal: 8,
                                        paddingVertical: 4,
                                        borderRadius: 7,
                                    }} size='xxs' weight='bold'>-40%</Text>
                                    <Text style={themed(({ colors, spacing }) => ({
                                        backgroundColor: colors.palette.muted,
                                        paddingHorizontal: spacing.xs,
                                        paddingVertical: spacing.xxs,
                                        borderRadius: 7,
                                    }))} size="xs" weight='medium'>{currentOffering.annual.product.priceString}</Text>
                                </View>
                            </TouchableOpacity>
                            }
                        </View>
                        <View style={themed($featuresContainer)}>
                            {
                                features.map((feature, index) => (
                                    <View key={index} style={themed(({ spacing }) => ({
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'flex-start',
                                        gap: spacing.md,
                                    }))}>
                                        <SmartImage imgKey={feature.imageKey} width={34} height={34} />
                                        <View style={{
                                            flex: 1,
                                        }}>
                                            <Text style={themed($title)} size="xs" weight='medium'>{feature.title}</Text>
                                            <Text style={themed($subtitle)} size="xxs" weight='medium'>{feature.description}</Text>
                                        </View>
                                    </View>
                                ))
                            }
                        </View>
                    </View>
                </>}
            </ScrollView>
            <FooterButton
                backgroundColor={theme.colors.palette.primary}
                label='Continue'
                onPress={() => { }}
                isLoading={isPurchasing}
            />
        </Screen>
    );
}

const $header: ViewStyle = {
    alignItems: 'center',
    justifyContent: 'center',
}
const $title: ThemedStyle<TextStyle> = ({ spacing, colors }) => ({
    color: colors.text
})

const $subtitle: ThemedStyle<TextStyle> = ({ spacing, colors }) => ({
    marginTop: spacing.xxs,
    color: colors.textDim,
})

const $featuresContainer: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
    gap: spacing.md,
    marginTop: spacing.xl,
})

const $common: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    padding: spacing.md,
    borderColor: colors.border,
})
const $monthly: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderBottomWidth: 0
})

const $annual: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
})