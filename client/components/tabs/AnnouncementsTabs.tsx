import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useEffect, useState } from "react";
import AnnouncementNotification from "../AnnouncementsNotificationComponent";
import { API_URL } from "@/constants";

export default function AnnouncementsTab() {
  const [announcements, setAnnouncements] = useState([]);

  const fetchAnnouncements = async () => {
    try {
      const res = await fetch(`${API_URL}getAnnouncements`);
      const data = await res.json();
      setAnnouncements(data.announcements || []);
    } catch (err) {
      console.log(err);
    }
  };

    useEffect(() => {
    fetchAnnouncements(); // initial fetch

    const interval = setInterval(() => {
        fetchAnnouncements();
    }, 5000); // 5 seconds

    return () => clearInterval(interval); // cleanup
    }, []);

  return (
    <BottomSheetScrollView contentContainerStyle={{ paddingBottom: 100 }}>
      {announcements.map((item: any, index) => (
        <AnnouncementNotification
          key={item.id || index}
          from={item.from}
          time={new Date(item.time).toLocaleString()}
          avatar={item.from} // you can replace later with real avatar
          title={item.title}
          content={item.message}
        />
      ))}
    </BottomSheetScrollView>
  );
}