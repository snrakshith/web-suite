const dateOfJoining = new Date(doctorDetails?.createdAt);
dateOfJoining?.toDateString();

{
  item?.expiry ? dayjs(new Date(item?.expiry)).format("DD MMM,YYYY") : "--";
}

{
  dayjs(ele?.payments?.receivedDate).format("DD MMM, YYYY");
}

{
  dayjs(new Date(apiData?.data?.data?.grn?.createdAt)).format("DD MMM,YYYY");
} // op: 23 Jul,2025

grn?.expiryDate?.toLocaleDateString();
