import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import InputField from "./components/Input";
import CategoryButton from "./components/Button";
import NewsCard from "./components/cards";
import moment from "moment";
import "./modal.css";

function App() {
  const apikey = "15846fa85da54320bc64f5128f72acf6";
  // a5cf886a8dd84801a01c8b5bd0da1b0d

  const [data, setData] = useState("");
  const [value, setvalue] = useState("");
  const [category, setCategory] = useState("");
  const [url, setUrl] = useState("");
  const [showModel, setShowModel] = useState(false);

  const fetchData = () => {
    axios
      .get(
        `https://newsapi.org/v2/everything?q=apple&from=2022-04-04&to=2022-04-04&sortBy=popularity&apiKey=${apikey}`
      )
      .then((res) => setData(res.data.articles))
      .catch((err) => console.log(err));
  };
  const fetchDataCategory = () => {
    axios
      .get(
        `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apikey}`
      )
      .then((res) => setData(res.data.articles))
      .catch((err) => console.log(err));
  };
  const fetchDataTechCrunch = () => {
    axios
      .get(
        `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${apikey}`
      )
      .then((res) => setData(res.data.articles))
      .catch((err) => console.log(err));
  };

  const fetchDataWST = () => {
    axios
      .get(`https://newsapi.org/v2/everything?domains=wsj.com&apiKey=${apikey}`)
      .then((res) => setData(res.data.articles))
      .catch((err) => console.log(err));
  };

  const [categoryList, setCategoryList] = useState([
    {
      categoryName: "TechCrunch",
      url: "url",
      onClick: fetchDataTechCrunch,
    },
    { categoryName: "Business", url: "url", onClick: fetchDataCategory },
    { categoryName: "Wall Street Journal", url: "url", onClick: fetchDataWST },
  ]);

  const addCategory = (categoryName) => {
    const newCategory = [...categoryList, { categoryName, url }];
    setCategoryList(newCategory);
  };

  const handleModal = () => {
    if (categoryList.length < 6) {
      addCategory(category);
      setShowModel(!showModel);
    } else if (categoryList.length > 5) {
      modalClose();
    }
  };

  const openModal = () => {
    if (categoryList.length < 5) {
      setShowModel(true);
    }
  };

  const modalClose = () => {
    setShowModel(false);
  };

  const AddCategoryList = () => {
    handleModal();
    setCategory("");
  };

  useEffect(() => {
    fetchDataTechCrunch();
  }, []);

  // https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=API_KEY

  console.log("data==>", data);

  return (
    <div className="App">
      <p className="newsHeading">News Today</p>

      <div className="categoryWrapper">
        {categoryList?.map((item, index) => (
          <div key={index}>
            <CategoryButton
              buttonName={item.categoryName}
              onClick={item.onClick}
            />
          </div>
        ))}

        <CategoryButton buttonName="+" onClick={openModal} />
      </div>

      <div className="searchInput">
        <InputField onChange={(e) => setvalue(e.target.value)} />
      </div>

      <div className="cardsWrapper">
        {data &&
          data.length &&
          data
            ?.filter((item) => {
              if (value === "") {
                return item;
              } else if (
                item.title.toLowerCase().includes(value.toLowerCase())
              ) {
                return value;
              }
            })
            .map((item, index) => (
              <NewsCard
                key={index}
                title={item.title}
                author={item.author}
                dateTime={moment(item.publishedAt).format(
                  "YYYY-MM-DD  hh:mm a "
                )}
                description={item.description}
                src={item.urlToImage}
              />
            ))}
      </div>

      {showModel ? (
        <div className="modalWrap">
          <div
            className="modal-wrapper"
            style={{
              transform: showModel ? "translateY(0vh)" : "translateY(-100vh)",
              opacity: showModel ? "1" : "0",
            }}
          >
            <div className="modal-header">
              <span className="close-modal-btn" onClick={modalClose}>
                ×
              </span>
            </div>

            <div className="modal-body">
              <h3>Add Category</h3>

              <div className="modalInputWrap">
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Category Name"
                />
              </div>

              <div className="modalInputWrap">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="API URL"
                />
              </div>

              <div className="modalButtonWrap">
                <button type="button" onClick={AddCategoryList}>
                  {" "}
                  + Add
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
