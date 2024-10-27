"use client"

import Loader from "@/app/components/ui/loader";
import { DetailProps } from "@/constant/constant";
import { dummyJsondb } from "@/dummy-jsondb/api";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function Users({ params }: { params: Promise<DetailProps> }) {
  const userDetailsInitialState = { firstName: '', lastName: '', image: '', gender: '', age: '', email: '' };
  const [userDetails, setUserDetails] = useState(userDetailsInitialState);
  const [userid, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserDetails = async () => {
    const { userid: userId } = await params; // Await params
    if (userId) {
      setUserId(userId)
      setUserDetails(await dummyJsondb.usersTaskList.userbyId(Number(userId)));
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);
    fetchUserDetails();
  }, [userid]);

  return (
    <>
   
    <div className="loader-profile">
      {loading ? (<Loader/>) : null}
    </div>
    <div className="row">
      <div className="col col-md-2 ml-10">
        <Link href={`/`} prefetch={false}>Home</Link>
      </div>
      <div className="col col-md-2">
        {
          userDetails?.image ? (
            <Image
              src={userDetails.image}
              alt={'profile-image'}
              width={100}
              height={150}
            />) : 'Loading..'
        }
      </div>
      <div className="col col-md-7 mt-40">
        <p>Name: {userDetails.firstName} {userDetails.lastName}</p>
        <p>Gender: {userDetails.gender}</p>
        <p>Age: {userDetails.age}</p>
        <p>Email: {userDetails.email}</p>
      </div>

    </div>
    </>
  )
}