SELECT
  date_trunc('month' :: text, "createdAt") AS MONTH,
  (count(*)) :: integer AS order_count,
  sum(total) AS total_sales
FROM
  "Order"
WHERE
  (STATUS = 'DELIVERED' :: "OrderStatus")
GROUP BY
  (date_trunc('month' :: text, "createdAt"))
ORDER BY
  (date_trunc('month' :: text, "createdAt"));