import { useEffect, useState, useRef } from "react";
import { supabase } from "../services/supabase";

export default function Admin() {

  const [profile, setProfile] = useState({
    name: "",
    bio: "",
    avatar: "",
    cover: ""
  });
  const [links, setLinks] = useState([]);
  
  
  function addLink() {
  setLinks([
    ...links,
    {
      id: null,
      title: "",
      url: "",
      icon: "facebook",
      visible: true,
      order_num: links.length + 1
    }
  ]);
}

  useEffect(() => {

  checkUser();

}, []);

async function checkUser() {

  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) {

    window.location.href =
      "/login";

    return;
  }

  loadData();
}

  async function loadData() {

    const { data } =
      await supabase
        .from("profile")
        .select("*")
        .single();

    if (data)
      setProfile(data);
    const { data: linksData } =
        await supabase
            .from("links")
            .select("*")
            .order("order_num");

    setLinks(linksData || []);
  }
async function deleteLink(link) {

  if (link.id) {

    await supabase
      .from("links")
      .delete()
      .eq("id", link.id);

  }

  setLinks(
    links.filter(
      item => item !== link
    )
  );

}

  function updateLink(
  id,
  field,
  value
) {

  setLinks(
    links.map((item) =>
      item.id === id
        ? {
            ...item,
            [field]: value
          }
        : item
    )
  );

}
  async function saveLinks() {

  for (const link of links) {

    if (link.id) {

      await supabase
        .from("links")
        .update({
          title: link.title,
          url: link.url,
          icon: link.icon,
          visible: link.visible,
          order_num: link.order_num
        })
        .eq("id", link.id);

    } else {

      await supabase
        .from("links")
        .insert({
          title: link.title,
          url: link.url,
          icon: link.icon,
          visible: link.visible,
          order_num: link.order_num
        });

    }

  }

  alert("Đã lưu links");

  loadData();
}

async function saveProfile() {

  await supabase
    .from("profile")
    .update({
      name: profile.name,
      bio: profile.bio,
      avatar: profile.avatar,
      cover: profile.cover
    })
    .eq("id", 1);

  alert("Đã lưu");
}
async function uploadAvatar(file) {

  if (!file) return;

  const fileName =
    Date.now() +
    "-" +
    file.name;

  await supabase
    .storage
    .from("images")
    .upload(
      fileName,
      file
    );

  const { data } =
    supabase
      .storage
      .from("images")
      .getPublicUrl(
        fileName
      );

  setProfile({
    ...profile,
    avatar:
      data.publicUrl
  });

}
async function uploadCover(file) {

  if (!file) return;

  const fileName =
    Date.now() +
    "-" +
    file.name;

  await supabase
    .storage
    .from("images")
    .upload(
      fileName,
      file
    );

  const { data } =
    supabase
      .storage
      .from("images")
      .getPublicUrl(
        fileName
      );

  setProfile({
    ...profile,
    cover:
      data.publicUrl
  });

}

async function logout() {

  await supabase.auth.signOut();

  window.location.href =
    "/login";

}

  return (
    <div className="admin-page">

      <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }}
>

  <h1>Quản trị</h1>

  <button
    onClick={logout}
  >
    Đăng xuất
  </button>

</div>

      <input
        value={profile.name}
        placeholder="Tên"
        onChange={(e)=>
          setProfile({
            ...profile,
            name:e.target.value
          })
        }
      />

      <input
        value={profile.bio}
        placeholder="Tiểu sử"
        onChange={(e)=>
          setProfile({
            ...profile,
            bio:e.target.value
          })
        }
      />

      <input
        value={profile.avatar}
        placeholder="avatar.jpg"
        onChange={(e)=>
          setProfile({
            ...profile,
            avatar:e.target.value
          })
        }
      />
      <input
  type="file"
  accept="image/*"
  onChange={(e) =>
    uploadAvatar(e.target.files[0])
  }
/>

      <input
        value={profile.cover}
        placeholder="cover.jpg"
        onChange={(e)=>
          setProfile({
            ...profile,
            cover:e.target.value
          })
        }
      />

      <input
  type="file"
  accept="image/*"
  onChange={(e) =>
    uploadCover(e.target.files[0])
  }
/>

{profile.avatar && (

  <img
    src={profile.avatar}
    alt="avatar"
    style={{
      width:"120px",
      height:"120px",
      borderRadius:"50%",
      objectFit:"cover",
      marginBottom:"15px"
    }}
  />

)}

{profile.cover && (

  <img
    src={profile.cover}
    alt="cover"
    style={{
      width:"100%",
      maxHeight:"220px",
      objectFit:"cover",
      borderRadius:"15px",
      marginBottom:"15px"
    }}
  />

)}


<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }}
>
  <h2>Danh sách liên kết</h2>

  <button
    onClick={addLink}
    style={{
      padding: "10px 15px",
      cursor: "pointer"
    }}
  >
    +
  </button>
</div>

{links.map((link) => (

  <div
    key={link.id}
    style={{
  background:"#111827",
  padding:"20px",
  marginBottom:"20px",
  borderRadius:"16px",
  boxShadow:"0 0 20px rgba(0,0,0,.25)"
}}
  >

    <input
      value={link.title}
      onChange={(e) =>
        updateLink(
          link.id,
          "title",
          e.target.value
        )
      }
    />

    <input
      value={link.url}
      onChange={(e) =>
        updateLink(
          link.id,
          "url",
          e.target.value
        )
      }
    />

    <select
  value={link.icon}
  onChange={(e) =>
    updateLink(
      link.id,
      "icon",
      e.target.value
    )
  }
>

  <option value="facebook">
    Facebook
  </option>

  <option value="tiktok">
    TikTok
  </option>

  <option value="instagram">
    Instagram
  </option>

  <option value="github">
    GitHub
  </option>

  <option value="steam">
    Steam
  </option>

</select>

    <label
      style={{
        display: "block",
        marginTop: "10px"
      }}
    >
      <input
        type="checkbox"
        checked={link.visible}
        onChange={(e) =>
          updateLink(
            link.id,
            "visible",
            e.target.checked
          )
        }
      />

      Hiển thị
    </label>

    <input
  type="number"
  value={link.order_num}
  onChange={(e) =>
    updateLink(
      link.id,
      "order_num",
      Number(e.target.value)
    )
  }
/>

<button
  onClick={() =>
    deleteLink(link)
  }
>
  Xóa
</button>

  </div>

))}

      <button onClick={saveProfile}>
  Lưu Profile
</button>

<button onClick={saveLinks}>
  Lưu Links
</button>

    </div>
  );
}