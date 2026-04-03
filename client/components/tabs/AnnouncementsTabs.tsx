import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import AnnouncementNotification from "../AnnouncementsNotificationComponent";


export default function AnnouncementsTab() {
    return (
        <BottomSheetScrollView contentContainerStyle={{ paddingBottom: 100 }} >
            <AnnouncementNotification from="Kapitan Tiago" time="6am" avatar="Testing" title="Announcement!" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elementum blandit urna, ut condimentum mauris consequat id. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam nibh nisl, bibendum auctor erat nec, auctor aliquam massa. Pellentesque vitae quam et est congue porttitor. Ut sagittis ut metus eget ullamcorper. Aenean ac justo at arcu volutpat sodales quis sit amet nisi. Morbi justo odio, feugiat tincidunt nisl sollicitudin, ullamcorper dapibus magna. Nullam ut vehicula ante. Etiam sit amet blandit justo, ut lacinia eros. Pellentesque accumsan purus sit amet purus faucibus pulvinar."/>
            <AnnouncementNotification from="Kapitan Tiago" time="6am" avatar="Testing" title="Announcement!" content="Okay ne pu ing dalan."/>
            <AnnouncementNotification from="Kapitan Tiago" time="6am" avatar="Testing" title="Announcement!" content="Okay ne pu ing dalan."/>
            <AnnouncementNotification from="Kapitan Tiago" time="6am" avatar="Testing" title="Announcement!" content="Okay ne pu ing dalan."/>
            <AnnouncementNotification from="Kapitan Tiago" time="6am" avatar="Testing" title="Announcement!" content="Okay ne pu ing dalan."/>

        </BottomSheetScrollView>
    )
}