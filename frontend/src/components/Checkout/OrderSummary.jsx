import SummaryCard from "../cart/SummaryCard";

export default function OrderSummary({
  total,
  cartItems,
  t,

  buttonText,
  onButtonClick,
  isLoading,
}) {
  const totalProducts = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <SummaryCard
      title={t("checkout.summary")}
      rows={[
        {
          label: t("checkout.products"),
          value: totalProducts,
        },
        {
          label: t("checkout.shipping"),
          value: t("checkout.free"),
          color: "success.main",
        },
      ]}
      totalLabel={t("checkout.total")}
      totalValue={`${total.toFixed(2)} ${t("currency")}`}
      buttonText={buttonText}
      onButtonClick={onButtonClick}
      isLoading={isLoading}
    />
  );
}
