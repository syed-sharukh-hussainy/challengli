import { useAuth } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";
import Purchases, {
    PurchasesOffering,
    LOG_LEVEL,
    CustomerInfo,
} from "react-native-purchases";
import { api } from "convex/_generated/api";
import { useQuery } from "convex/react";

const apiKey = process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_KEY || "";


const useRevenueCat = () => {
    const [currentOffering, setCurrentOffering] = useState<PurchasesOffering | null>(null);
    const { userId } = useAuth();
    const user = useQuery(api.users.getUser, {});

    const isProMember = user?.subscriptions?.expirationDate
        ? new Date(user.subscriptions.expirationDate) > new Date()
        : false;

    useEffect(() => {
        const setup = async () => {
            if (!apiKey || !userId) return;

            await Purchases.setLogLevel(LOG_LEVEL.DEBUG);
            await Purchases.configure({ apiKey, appUserID: userId });

            const offerings = await Purchases.getOfferings();
            setCurrentOffering(offerings.current);
        };

        setup().catch(console.error);
    }, [userId]);

    const purchasePackage = async (pkg: any) => {
        const { customerInfo } = await Purchases.purchasePackage(pkg);

        // You *do not* need to do anything with customerInfo here
        // Your backend (via webhook) will update Convex user
        return customerInfo;
    };

    return {
        currentOffering,
        purchasePackage,
        isProMember,
    };
};

export default useRevenueCat;
