import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import useDocumentTitle from "../../../components/useDocumentTitle";
import Header from "../../../components/header/Header";
import {
  Button,
  Cascader,
  Checkbox,
  Form,
  Input,
  InputNumber,
  message,
  Select,
  Space,
  Switch,
  Upload,
} from "antd";
import {
  InboxOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import useNFT from "../../../hooks/useNFT";
import { NFT_CONTRACT } from "../../../config/constant/contract";
import useStorage from "../../../hooks/useStorage";
import { useLazyQuery, useMutation } from "@apollo/client";
import { CreateNft } from "../../../graphql/mutations/nftMutations";
import { useWeb3React } from "@web3-react/core";
import { getNetworkName } from "../../../utils/utility";
import Loading from "../../../components/Loading/Loading";
import useAuth from "../../../hooks/useAuth";
import Footer from "../../../components/footer/Footer";
import { useEffect } from "react";
import { GetOwnerNFT, UserInfo } from "../../../graphql/queries/userQueries";
import { FilterNfts, GetAll } from "../../../graphql/queries/nftQueries";
import useWeb3 from "../../../hooks/useWeb3";
import { GRAPHQL_API } from "../../../config/constant/url";
const { Option } = Select;

const NftUpload = () => {
  const [collectionData, setCollectionData] = useState([]);
  useEffect(() => {
    fetch(GRAPHQL_API + "/api/collection/all")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCollectionData(data);
      });
  }, []);
  useDocumentTitle("Upload");
  const [form] = Form.useForm();
  const { login } = useAuth();
  const { signCreate } = useWeb3();
  const { mintNFT } = useNFT();
  const { chainId, account, active } = useWeb3React();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState(null);
  const [payment, setPayment] = useState()

  const { uploadOnIpfs, downloadJSONOnIpfs } = useStorage();
  const [createNft] = useMutation(CreateNft);
  const history = useHistory();
  const [filled, setFilled] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const [getAllNft] = useLazyQuery(GetAll);
  const handleSubmit = (values) => {
    let description = values.description;
    let title = values.title;
    // let collections = values.categories[0];
    let musician = values.musician;
    let auction = values.isauction;
    let price = values.price;
    let supply = 1;
    // let teams = values.categories[1];
    // let athlete = values.categories[2];

    // console.log(collections, values.categories);
    const royaltyCut = values.royalties;
    const royaltyAddress = values.royaltyAddress;

    let properties = [];
    let imageFormObj = new FormData();

    imageFormObj.append("image", fileList);

    const metadata = {
      title: title,
      description: description,
      image: imageFormObj.get("image"),
      creator: account,
      properties: properties,
    };

    try {
      if (active) {
        setLoading(true);

        uploadOnIpfs(metadata).then(async (uri) => {
          console.log(uri);
          const count = await getAllNft();
          console.log((count.data.nfts.length + 1000000 + 1).toString());

          if (isChecked) {
            signCreate(uri, royaltyCut, royaltyAddress)
              .then(async (res) => {
                console.log(res);
                const data = await downloadJSONOnIpfs(uri);
                console.log(data);
                console.log(res);
                let tokenId = res.events.Transfer.returnValues.tokenId;
                createNft({
                  variables: {
                    name: title,
                    tokenId: tokenId,
                    url: uri,
                    chainId: chainId,
                    creatorAddress: account,
                    ownerAddress: account,
                    imageUrl: data.image,
                    network: getNetworkName(chainId),
                    collectionAddress: NFT_CONTRACT,
                    // collections: collections,
                    // athlete: athlete,
                    availability: "",
                    musician: musician,
                    nftStatus: getNetworkName(chainId),
                    // teams: teams,
                    artist: "",
                    lazyMint: JSON.stringify(res),
                    lazyMintData: "",
                    isAuction: auction,
                  },
                  update: (cache) => {
                    cache.writeQuery({
                      query: FilterNfts,
                      data: {
                        filterNfts: {
                          collections: "",
                          team: "",
                          athlete: "",
                          musician: "",
                          artist: "",
                          network: "",
                          nftStatus: "",
                          page: 0,
                        },
                      },
                      variables: {
                        collections: "",
                        team: "",
                        athlete: "",
                        musician: "",
                        artist: "",
                        network: "",
                        nftStatus: "",
                        page: 0,
                      },
                    });
                    cache.writeQuery({
                      query: GetOwnerNFT,
                      data: {
                        getNftsOfOwner: {
                          ownerAddress: account,
                        },
                      },
                      variables: {
                        ownerAddress: account,
                      },
                    });
                  },
                }).then((res) => {
                  setLoading(false);
                  history.goBack();
                  console.log(res);
                });
              })
              .catch((err) => {
                console.log(err);
                setLoading(false);
              });
          } else {
            if (parseInt(supply) <= 1) {
              signCreate(price, uri, royaltyCut, royaltyAddress)
                .then(async (res) => {
                  console.log(res);
                  const data = await downloadJSONOnIpfs(uri);
                  console.log(data);
                  console.log(res);
                  // let tokenId = res.events.Transfer.returnValues.tokenId;
                  const count = await getAllNft();
                  console.log(count);
                  createNft({
                    variables: {
                      name: title,
                      tokenId: (
                        count.data.nfts.length +
                        1000000 +
                        1
                      ).toString(),
                      url: uri,
                      chainId: chainId,
                      creatorAddress: account,
                      ownerAddress: account,
                      imageUrl: data.image,
                      network: getNetworkName(chainId),
                      lazyMint: "1",
                      lazyMintData: JSON.stringify(res),
                      isAuction: auction,
                      // nftStatus: getNetworkName(chainId) + "_sold",
                      nftStatus: getNetworkName(chainId),
                      collectionAddress: NFT_CONTRACT,
                      // collections: collections,
                      // athlete: athlete,
                      musician: musician,
                      // teams: teams,
                      artist: "",
                      availableSupply: 0,
                      mintedNft: 0,
                      supply: 0,
                      isMarketPlace: true,
                    },
                    refetchQueries: [
                      {
                        query: GetAll,
                      },
                    ],
                    update: (cache) => {
                      cache.writeQuery({
                        query: FilterNfts,
                        data: {
                          filterNfts: {
                            collections: "",
                            team: "",
                            athlete: "",
                            musician: "",
                            artist: "",
                            network: "",
                            nftStatus: "",
                            page: 0,
                          },
                        },
                        variables: {
                          collections: "",
                          team: "",
                          athlete: "",
                          musician: "",
                          artist: "",
                          network: "",
                          nftStatus: "",
                          page: 0,
                        },
                      });
                    },
                  }).then((res) => {
                    setLoading(false);
                    history.goBack();
                    console.log(res);
                  });
                })
                .catch((err) => {
                  console.log(err);
                  setLoading(false);
                });
            } else {
              signCreate(price, uri, royaltyCut, royaltyAddress)
                .then(async (res) => {
                  console.log(res);
                  const data = await downloadJSONOnIpfs(uri);
                  console.log(data);
                  console.log(res);
                  // let tokenId = res.events.Transfer.returnValues.tokenId;
                  const count = await getAllNft();
                  console.log(count);
                  createNft({
                    variables: {
                      name: title,
                      tokenId: (
                        count.data.nfts.length +
                        1000000 +
                        1
                      ).toString(),
                      url: uri,
                      chainId: chainId,
                      creatorAddress: account,
                      ownerAddress: account,
                      imageUrl: data.image,
                      network: getNetworkName(chainId),
                      lazyMint: "1",
                      lazyMintData: JSON.stringify(res),
                      isAuction: auction,
                      nftStatus: "minted",
                      collectionAddress: NFT_CONTRACT,
                      // collections: collections,
                      // athlete: athlete,
                      musician: musician,
                      // teams: teams,
                      artist: "",
                      mintedNft: 0,
                      availableSupply: parseInt(supply),
                      supply: parseInt(supply),
                      isMarketPlace: true,
                    },
                    update: (cache) => {
                      cache.writeQuery({
                        query: FilterNfts,
                        data: {
                          filterNfts: {
                            collections: "",
                            team: "",
                            athlete: "",
                            musician: "",
                            artist: "",
                            network: "",
                            nftStatus: "",
                            page: 0,
                          },
                        },
                        variables: {
                          collections: "",
                          team: "",
                          athlete: "",
                          musician: "",
                          artist: "",
                          network: "",
                          nftStatus: "",
                          page: 0,
                        },
                      });
                    },
                  }).then((res) => {
                    setLoading(false);
                    history.goBack();
                    console.log(res);
                  });
                })
                .catch((err) => {
                  console.log(err);
                  setLoading(false);
                });
            }
          }
        
        });
      } else {
        message.error("Connect Wallet first");
      }
    } catch (error) {
      console.log(error);
      message.error("error");
    }
  };

  const setPaymentMethod = (value, key) => {
    console.log(value, "///////", key.key)
    if (key.key == 0) {
      setPayment(0)
    } else {
      setPayment(1)

    }
  }


  const categoryElement = useRef();
  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Header />
      <div className="">
        <div className="container"></div>
      </div>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        ref={categoryElement}
        initialValues={{ isauction: false, musician: "" }}>
        <div className="container">
          <div className="box in__upload mb-120">
            <div className="row">
              <div className="col-lg-6">
                <div
                  className="left__part space-y-40 md:mb-20 upload_file"
                  style={{
                    height: "fit-content",
                    padding: "10px",
                    borderRadius: "10px",
                    marginBottom: "0",
                  }}>
                  <div className="space-y-20">
                    <Form.Item>
                      <Form.Item
                        name="dragger"
                        // valuePropName="fileList"

                        noStyle
                        rules={[
                          {
                            required: true,
                            message: "Add image or file ",
                          },
                        ]}>
                        <Upload.Dragger
                          multiple={true}
                          name="files"
                          maxCount={1}
                          // listType="picture"
                          accept="png,jpg,jpeg"
                          beforeUpload={(file) => setFileList(file)}>
                          <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                          </p>
                          <p className="ant-upload-text">
                            Click or drag file to this area to upload
                          </p>
                          <p className="ant-upload-hint">
                            Support (jpg/png) for a single upload.
                          </p>
                        </Upload.Dragger>
                      </Form.Item>
                    </Form.Item>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group space-y-10">
                  <div className="space-y-20">
                    <div className="space-y-10">
                      <Form.Item
                        label="Title"
                        name="title"
                        rules={[
                          {
                            required: true,
                            message: "Please input your title!",
                          },
                        ]}>
                        <Input
                          className="form-control"
                          placeholder="e. g. NFT #01"
                        />
                      </Form.Item>
                    </div>

                    <div className="space-y-10">
                      <Form.Item
                        label="Description"
                        name="description"
                        rules={[
                          {
                            required: true,
                            message: "Please input your description!",
                          },
                        ]}>
                        <Input.TextArea
                          className="form-control"
                          placeholder="e. g. `Lorem Ipsum - Lorem Ipsum - Lorem Ipsum - Lorem Ipsum - Lorem Ipsum - Lorem Ipsum - Lorem Ipsum`"
                        />
                      </Form.Item>
                    </div>

                    {!isChecked && (
                      <div className="space-y-10">
                        <Form.Item
                          label="Price"
                          name="price"
                          rules={[
                            {
                              required: true,
                              message: "Please input Price!",
                            },
                          ]}>
                          <Input
                            type="number"
                            min={0.00001}
                            step={0.00001}
                            placeholder="e. g. 0.0001"
                          />
                        </Form.Item>
                      </div>
                    )}
                    <div className="space-y-10">
                      <Form.Item
                        label="Royalties"
                        name="royalties"
                        rules={[
                          {
                            required: true,
                            message: "Please input Royalties!",
                          },
                        ]}>
                        <Input
                          type="number"
                          min={0}
                          max={50}
                          className="form-control"
                          placeholder="e. g. 10%"
                        />
                      </Form.Item>
                    </div>
                    <div className="space-y-10">
                      <Form.Item
                        label="Royalties Address"
                        name="royaltyAddress"
                        rules={[
                          {
                            required: true,
                            message: "Please input Royalties Address!",
                          },
                        ]}>
                        <Input
                          type="text"
                          className="form-control"
                          placeholder="e. g. 0x50021f7e60caa0C25575c22D66CEEDdfF8BF8A35"
                        />
                      </Form.Item>
                    </div>
                    <div className="space-y-10">
                      <div label="Status" name="royalties">
                        <label>Status</label>
                        <Input
                          type="text"
                          placeholder="polygon"
                          value={getNetworkName(chainId)}
                          disabled="true"
                        />
                          {/* <Select
                          placeholder="Select Payment Methods"
                          style={{ width: "100%" }}
                          onChange={setPaymentMethod}
                        >
                          <Option key="0" value="BINANCE">
                            BINANCE
                          </Option>
                          <Option key="1" value="BIDEX TOKEN">
                            BIDEX TOKEN
                          </Option>
                        </Select> */}
                      </div>
                    </div>
                    {/* {!isChecked && (
                      <div className="space-y-10">
                        <Form.Item
                          label="Supply"
                          name="supply"
                          rules={[
                            {
                              required: true,
                              message: "Please input supply!",
                            },
                          ]}>
                          <Input
                            type="number"
                            min={1}
                            max={1}
                            className="form-control"
                            placeholder="e. g. 1"
                          />
                        </Form.Item>
                      </div>
                    )} */}

                    <div className="space-y-10">
                      <span className="variationInput">Collection</span>
                      <div className="d-flex flex-column flex-md-row">
                        <div className="choose_collection bg_black  ">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/logo-2.png"
                            }
                            alt="logo"
                            style={{ width: "3rem", height: "2rem" }}
                          />

                          <span className="color_white ml-10">
                            Bidex NFTCollection
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="fixed_row bottom-0 left-0 right-0">
          <div className="container">
            <div className="row content justify-content-between mb-20_reset">
              <div className="col-md-auto col-12 mb-20">
                <div className="space-x-10"></div>
              </div>
              <div className="col-md-auto col-12 mb-20">
                <Form.Item>
                  {!active ? (
                    <Button
                      onClick={login}
                      to="item-details"
                      className="btn btn-grad
					btn_create">
                      Connect Wallet
                    </Button>
                  ) : (
                    <Button
                      className="btn btn-grad"
                      htmlType="submit"
                      to="item-details">
                      Sign Create
                    </Button>
                  )}
                </Form.Item>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

const MultipleSelectCategories = ({ filled, setFilled, form, options }) => {
  const seletResetChange = async (e) => {
    form.resetFields(["collections", "teams", "athlete"]); //reset particular field
  };

  const onChange = (value) => {
    console.log(value);
    setFilled(!filled);
  };
  return (
    <>
      <div class="ant-col ant-form-item-label">
        <label class="ant-form-item" title="Properties">
          Sports Categories
        </label>
      </div>
      <Form.Item name="categories">
        <Cascader
          showSearch
          fieldNames={{
            label: "name",
            value: "code",
            children: "items",
          }}
          disabled={filled}
          options={options}
          onChange={onChange}
          placeholder="Please select categories"
        />
      </Form.Item>
      <div className="d-flex justify-content-end">
        {" "}
        <div
          style={{
            fontWeight: "bold",
            color: "red",
            marginTop: "10px",
            cursor: "pointer",
          }}
          onClick={() => {
            setFilled(false);
            seletResetChange();
          }}>
          Reset
        </div>
      </div>
    </>
  );
};

export default NftUpload;
