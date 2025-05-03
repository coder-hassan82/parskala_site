"use client";

import { useUser } from "@/app/_components/context";
import { getAddress } from "@/app/_server/data-server";
import style from "@/app/_style/Shipment.module.css";
import {
  faLocationCrosshairs,
  faPhone,
  faUser,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import AddNewAddres from "./AddNewAddres";

export default function MyAddress() {
  const { user } = useUser();
  const [userAddress, setUserAddress] = useState(null);
  const [addAddres, setAddAddres] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (user?.id) {
        const data = await getAddress(user.id);
        setUserAddress(data);
      }
    };
    fetchData();
  }, [user]);

  const handleSelectAddress = (addressId) => {
    setSelectedAddressId(addressId);

    const existingOrderData = JSON.parse(
      localStorage.getItem("order-data") || "{}"
    );
    const updatedOrderData = {
      ...existingOrderData,
      address_id: addressId,
    };
    localStorage.setItem("order-data", JSON.stringify(updatedOrderData));
  };

  if (!userAddress) {
    return (
      <div className={style.profileLoading}>در حال بارگذاری اطلاعات...</div>
    );
  }

  return (
    <div className={style.rigthSide}>
      <div className={style.header}>
        <span>نشانی ها</span>
        <button className={style.addAdress} onClick={() => setAddAddres(true)}>
          افزودن آدرس جدید +
        </button>
      </div>
      <div className={style.addresContainer}>
        {userAddress?.map((address) => (
          <div
            key={address.id}
            className={`${style.addresBox} ${
              selectedAddressId === address.id ? style.selected : ""
            }`}
            onClick={() => handleSelectAddress(address.id)}
          >
            <div className={style.completAddres}>
              <FontAwesomeIcon icon={faLocationCrosshairs} />
              <h3>{address.address}</h3>
            </div>
            <div className={style.recipient_info}>
              <div className={style.partOfInfo}>
                <FontAwesomeIcon icon={faPhone} />
                <span>{address.phone}</span>
              </div>
              <div className={style.partOfInfo}>
                <FontAwesomeIcon icon={faUser} />
                <span>{address.full_name}</span>
              </div>
              <div className={style.partOfInfo}>
                <FontAwesomeIcon icon={faEnvelope} />
                <span>{address.postal_code}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {addAddres && <AddNewAddres user={user} setAddAddres={setAddAddres} />}
    </div>
  );
}
