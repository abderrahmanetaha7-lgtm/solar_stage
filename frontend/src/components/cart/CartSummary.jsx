import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import useCart from "../../hooks/useCart";

import SummaryCard from "./SummaryCard";

export default function CartSummary({
  isLoading = false,
}) {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const { total, totalArticles } = useCart();

  return (
    <SummaryCard
      title={t("cart.summary")}
      rows={[
        {
          label: t("cart.products"),
          value: totalArticles,
        },
        {
          label: t("cart.shipping"),
          value: t("cart.free"),
          color: "success.main",
        },
      ]}
      totalLabel={t("cart.total")}
      totalValue={`${total.toFixed(2)} ${t("currency")}`}
      buttonText={t("cart.checkout")}
      onButtonClick={() =>
        navigate("/checkout")
      }
      isLoading={isLoading}
    />
  );
}