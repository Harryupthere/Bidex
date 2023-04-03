import React, { useEffect, useRef, useState } from "react";
import Footer from "../../../components/footer/Footer";
import Header from "../../../components/header/Header";
import HeroEditProfile from "../../../components/hero/HeroEditProfile";
import useDocumentTitle from "../../../components/useDocumentTitle";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Link, useHistory } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { UserUpdate } from "../../../graphql/mutations/useMutations";
import { Button, Form, Input, Modal, Upload } from "antd";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { UserInfo } from "../../../graphql/queries/userQueries";
import { useWeb3React } from "@web3-react/core";
import Loading from "../../../components/Loading/Loading";
import useAuth from "../../../hooks/useAuth";
import useStorage from "../../../hooks/useStorage";
import CopyToClipboard from "react-copy-to-clipboard";

const EditProfile = () => {
  const update = () => toast.success("Your Profile updated");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const ref = useRef();
  const closeTooltip = () => ref.current.close();
  const { account, active } = useWeb3React();
  const [userUpdate] = useMutation(UserUpdate);
  const [open, setOpen] = useState(false);
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState(null);
  const { UserRegister } = useAuth();
  const { getImageLink } = useStorage();
  const history = useHistory();
  const { data, error } = useQuery(UserInfo, {
    variables: {
      walletAddress: account,
    },
  });
  console.log(data, account);
  const onUpdateInfo = (values) => {
    setLoading(true);
    console.log(values, fileList);
    let imageFormObj = new FormData();
    imageFormObj.append("image", fileList);
    console.log(values, data?.user?.user?._id);
    if (data?.user === null) {
      UserRegister(
        "name",
        values.txtUsername,
        values.about_details,
        values.twitterUrl,
        values.facebookUrl,
        values.instagramUrl
      );
    } else {
      userUpdate({
        variables: {
          userId: data?.user?.user?._id,
          displayName: "name",
          username: values.txtUsername,
          avatarUrl: data?.user?.user?.avatar_url,
          aboutDetails: values.about_details,
          twitterUrl: values.twitterUrl,
          instagramUrl: values.instagramUrl,
          bgImage: data?.user?.user?.bg_image,
          facebookUrl: values.facebookUrl,
        },
        refetchQueries: [
          {
            query: UserInfo,
            variables: {
              walletAddress: account,
            },
          },
        ],
      })
        .then((res) => {
          console.log(res);
          update();
          setLoading(false);
          history.push("/profile");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useDocumentTitle("Create  Profile");
  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }
  return (
    <div className="edit_profile">
      <Header />
      <HeroEditProfile />
      <div className="container">
        <Form layout="vertical" onFinish={onUpdateInfo}>
          <div>
            <div
              className="avatars space-x-20 mb-30"
              style={{ display: "none" }}
            >
              <div id="profile-container">
                <img
                  id="profileImage"
                  src="https://lumiere-a.akamaihd.net/v1/images/sa_pixar_virtualbg_coco_16x9_9ccd7110.jpeg"
                  alt="Avatar"
                  className="avatar avatar-lg border-0"
                />
              </div>
              <div className="space-x-10 d-flex">
                <div id="boxUpload">
                  <Form.Item
                    name="upload"
                    valuePropName="fileList"
                    getValueFromEvent={(file) => setFileList(file)}
                  >
                    <Upload name="logo" listType="picture">
                      <Button
                        className="btn btn-dark"
                        icon={<UploadOutlined />}
                      >
                        Click to upload
                      </Button>
                    </Upload>
                  </Form.Item>
                </div>

                <ToastContainer position="bottom-right" />
              </div>
            </div>

            <div className="box edit_box col-lg-9 space-y-30">
              <div className="row sm:space-y-20">
                <div className="col-lg-6 account-info">
                  <h3 className="mb-20">Account info 🍉</h3>
                  <div className="form-group space-y-10 mb-0">
                    <div className="space-y-40">
                      <div className="space-y-10">
                        <Form.Item
                          label="Username"
                          name="txtUsername"
                          rules={[
                            {
                              required: true,
                              message: "Please input your username!",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </div>
                      {/* <div className="space-y-10">
                        <Form.Item label="Profile Image" name="profileImage">
                          <Input />
                        </Form.Item>
                        <ImageModal
                          setOpen={setOpen}
                          open={open}
                          text={"Upload profile image"}
                          getImageLink={getImageLink}
                        />
                      </div>
                      <div className="space-y-10">
                        <Form.Item label="Background Image" name="bgImage">
                          <Input />
                        </Form.Item>
                        <ImageModal
                          setOpen={setOpen}
                          open={open}
                          text={"Upload background image"}
                          getImageLink={getImageLink}
                        />
                      </div> */}
                      <div className="space-y-10">
                        <Form.Item
                          label="About"
                          name="about_details"
                          rules={[
                            {
                              required: true,
                              message: "Please input your About!",
                            },
                          ]}
                        >
                          <Input.TextArea
                          // defaultValue={data?.user?.user.about_details}
                          />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 social-media">
                  <h3 className="mb-20">Your Social media</h3>
                  <div className="form-group space-y-10">
                    <div className="space-y-40">
                      <div className="d-flex flex-column">
                        <Form.Item
                          label="Facebook"
                          name="facebookUrl"
                          rules={[
                            {
                              required: true,
                              message: "Please input your Facebook URL !",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </div>
                      <div className="d-flex flex-column">
                        <Form.Item
                          label="Twitter"
                          name="twitterUrl"
                          rules={[
                            {
                              required: true,
                              message: "Please input your Twitter URL!",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </div>{" "}
                      <div className="d-flex flex-column">
                        <Form.Item
                          label="Instagram"
                          name="instagramUrl"
                          rules={[
                            {
                              required: true,
                              message: "Please input your Instagram URL!",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hr" />
              <p className="color_black">
                To update your settings you should sign message through your
                wallet. Click 'Update profile' then sign the message.
              </p>
              {active ? (
                <div>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="btn btn-grad"
                    >
                      Update Profile
                    </Button>
                  </Form.Item>
                </div>
              ) : (
                <div>
                  <Button
                    type="primary"
                    onClick={login}
                    className="btn btn-grad"
                  >
                    Connect Wallet
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Form>
      </div>

      <Footer />
    </div>
  );
};

const ImageModal = ({ setOpen, open, text, getImageLink }) => {
  const [previewURL, setPreviewUrl] = useState(null);
  const [copyLink, setCopyLink] = useState(null);
  const [upload, setUpload] = useState(false);
  useEffect(() => {
    setCopyLink(null);
  }, []);
  return (
    <>
      <>
        <p
          style={{
            fontSize: "12px",
            color: "#ff4d4f",
            cursor: "pointer",
          }}
          onClick={() => setOpen(true)}
          data-toggle="modal"
          data-target="#exampleModal"
        >
          {text}
        </p>

        <Modal
          footer={null}
          title={text}
          centered
          open={open}
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        >
          <Upload.Dragger
            name="logo"
            listType="picture"
            onChange={(e) => {
              console.log(e);
              setPreviewUrl(e.fileList[0].originFileObj);
            }}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibit from
              uploading company data or other band files
            </p>
          </Upload.Dragger>

          {copyLink !== null && (
            <p className="mt-3">
              Copy your {text.toLowerCase()}
              {" : "}
              <Link>
                <span
                  onClick={() => {
                    navigator.clipboard.writeText(copyLink);
                    alert("Link copied");
                    setOpen(false);
                  }}
                >
                  Copy Link
                </span>
              </Link>
            </p>
          )}

          <button
            class="mt-5 w-full ant-btn ant-btn-primary btn btn-grad"
            type="button"
            disabled={upload}
          >
            {upload ? (
              <>
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                >
                  {" "}
                </span>{" "}
                <span> Uploading...</span>
              </>
            ) : (
              <>
                {" "}
                <div
                  className="w-full"
                  onClick={async () => {
                    setUpload(true);
                    let image = await getImageLink({ image: previewURL });
                    setCopyLink(image.image);
                    setUpload(false);
                  }}
                >
                  {" "}
                  Upload{" "}
                </div>
              </>
            )}
          </button>
        </Modal>
      </>
    </>
  );
};

export default EditProfile;
