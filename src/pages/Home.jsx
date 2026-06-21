import { useEffect, useState } from "react";

import { supabase } from "../services/supabase";

import SocialButton from "../components/SocialButton";

import {
  FaFacebook,
  FaInstagram,
  FaGithub,
  FaSteam,
  FaTiktok
} from "react-icons/fa";

export default function Home() {

  const [profile, setProfile] =
    useState(null);

  const [links, setLinks] =
    useState([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {

    const { data: profileData } =
      await supabase
        .from("profile")
        .select("*")
        .single();

    setProfile(profileData);

    const { data: linksData } =
      await supabase
        .from("links")
        .select("*")
        .eq("visible", true)
        .order("order_num");

    setLinks(linksData || []);
  }

  const icons = {
    facebook: <FaFacebook />,
    tiktok: <FaTiktok />,
    instagram: <FaInstagram />,
    github: <FaGithub />,
    steam: <FaSteam />
  };

  if (!profile)
    return <h1>Loading...</h1>;

  return (
  <div className="home">

    <div
      className="cover"
      style={{
        backgroundImage: `url(${profile.cover})`
      }}
    />

    <div className="profile-card">

      <img
        src={profile.avatar}
        className="avatar"
      />

      <h1>{profile.name}</h1>

      <p>{profile.bio}</p>

    </div>

    <div className="links">

        {links.map(link => (

          <SocialButton
            key={link.id}
            title={link.title}
            link={link.url}
            icon={icons[link.icon]}
          />

        ))}

      </div>

    </div>
  );
}