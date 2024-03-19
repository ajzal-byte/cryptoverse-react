import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";
import Loader from "./Loader";

import {
  useGetCryptoNewsQuery,
  useGetCryptoSearchNewsQuery,
} from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { useEffect, useState } from "react";

const { Text, Title } = Typography;
const { Option } = Select;
const demoImgUrl = "https://static.thenounproject.com/png/504708-200.png";

const News = ({ simplified }) => {
  const count = simplified ? 6 : 12;
  const [newsInput, setNewsInput] = useState("");
  const { data } = useGetCryptosQuery(100);
  const {data: cryptoNews, isFetching} = newsInput ? useGetCryptoSearchNewsQuery(newsInput) : useGetCryptoNewsQuery(count)
  console.log(cryptoNews);

  useEffect(() => {
    // Execute the search query if newsInput has a value
    if (newsInput) {
      useGetCryptoSearchNewsQuery(newsInput);
    }
  }, [newsInput]);
  

  if (isFetching) return <Loader/>;

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsInput(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {data?.data?.coins.map((coin) => <Option value={coin.name}>{coin.name}</Option>)}
          </Select>
        </Col>
      )}
      {cryptoNews?.news?.map((cnews, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="new-card">
            <a href={cnews.Url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {cnews.Title}
                </Title>
                <img
                  src={cnews.Image || demoImgUrl}
                  style={{ objectFit: "cover" }}
                  width={100}
                  height={100}
                />
              </div>
              <p>
                {cnews.Summary.length > 100
                  ? `${cnews.Summary.substring(0, 100)}...`
                  : cnews.Summary}
              </p>
              <div className="provider-container" style={{ marginTop: "5px" }}>
                <div>
                  <Text className="provider-name">{cnews.Source}</Text>
                </div>
                <Text>{moment(cnews.PublishedOn).startOf("ss").fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;

// const obj = {
//   "Title": "44 West Mining Announces Expansion of its Kitty Site and Deployment of 575 New Bitcoin Miners",
//   "Source": "prnewswire.com",
//   "Url": "https://www.prnewswire.com/news-releases/44-west-mining-announces-expansion-of-its-kitty-site-and-deployment-of-575-new-bitcoin-miners-302090998.html",
//   "PublishedOn": "2024-03-18T14:00:00.000Z",
//   "Description": "/PRNewswire/ -- 44 West Mining, LLC (\"44 West\" or the \"Company\"), Wyoming's premier immersion-cooled Bitcoin (BTC) mining company, today announced the...",
//   "Language": "en",
//   "Image": "https://mma.prnewswire.com/media/2364227/44_West_Mining_Logo.jpg?p=facebook",
//   "SourceNationality": "us",
//   "TitleSentiment": {
//       "sentiment": "positive",
//       "score": 0.87
//   },
//   "Summary": "Following this deployment, approximately 5MW of 20MW total capacity is now operational at 44 West's Kitty site. Jamie Terranova, President & CEO of 44 West, commented, \"We are pleased to announce that we have begun the expansion of our Kitty site in Gillette.",
//   "Countries": [
//       "us"
//   ],
//   "CryptoCurrencies": [
//       "Bitcoin"
//   ]
// }
