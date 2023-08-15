type Message = {
  id: string;
  content: string;
  timestamp: Date;
  tags: Tag[];
};

type Tag = {
  id: string;
  tagName: string;
};

type TagOption = {
  value: string;
  label: string;
  __isNew__?: boolean;
};

type MyError = {
  message: string;
};
