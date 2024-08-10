type bodyType = {
  id: {
    description: "The unique identifier of the activity";
    type: "string";
    readOnly: true;
    example: "12345";
  };
  Atype: {
    description: "The type of the activity";
    type: "string";
    "x-apideck-enum-id": "activities.type";
    enum: [
      "call",
      "meeting",
      "email",
      "note",
      "task",
      "deadline",
      "send-letter",
      "send-quote",
      "other"
    ];
    example: "meeting";
    nullable: true;
  };
};
