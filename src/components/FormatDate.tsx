"use client";

import React from "react";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const FormatDate = ({ date }) => {
  return <span>{formatDate(date)}</span>;
};

export default FormatDate;
