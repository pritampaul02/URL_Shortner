import { BASE_URL } from "@/App";
import DeviceStats from "@/components/device-stats";
import LocationStats from "@/components/location-stats";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { UrlState } from "@/context/context";
import { getClicksForUrl } from "@/db/apiClicks";
import { deleteUrl, getUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import { Copy, Download, LinkIcon, Trash } from "lucide-react";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BarLoader, BeatLoader } from "react-spinners";

const Link = () => {
    const navigate = useNavigate();

    const { id } = useParams();
    const { user } = UrlState();

    const {
        loading,
        data: url,
        fn,
        error,
    } = useFetch(getUrl, { id, user_id: user?.id });

    console.log(url);

    const {
        loading: loadingStats,
        data: stats,
        fn: fnStats,
    } = useFetch(getClicksForUrl, id);

    const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, id);

    useEffect(() => {
        fn();
        fnStats();
    }, []);

    if (error) {
        navigate("/dashboard");
    }

    let link = "";
    if (url) {
        link = url?.custom_url ? url?.custom_url : url?.short_url;
    }

    const downloadImage = () => {
        const imageUrl = url?.qr;
        const fileName = url?.title;

        const anchor = document.createElement("a");
        anchor.href = imageUrl;
        anchor.download = fileName;

        document.body.appendChild(anchor);

        anchor.click();

        document.body.removeChild(anchor);
    };

    return (
        <>
            {(loading || loadingStats) && (
                <BarLoader className="mb-4" width={"100%"} color="white" />
            )}

            <div className="flex flex-col gap-8 sm:flex-row justify-between">
                <div className="flex flex-col items-start gap-8 rounded-lg sm:w-2/5">
                    <span className="text-6xl font-extrabold hover:underline cursor-pointer">
                        {url?.title}
                    </span>
                    <a
                        href={`${BASE_URL}${link}`}
                        target="_blank"
                        className="text-3xl sm:text-4xl text-blue-400 font-bold hover:underline cursor-pointer"
                    >
                        {BASE_URL}
                        {link}
                    </a>
                    <a
                        href={url?.original_url}
                        target="_blank"
                        className="flex items-center gap-1 hover:underline cursor-pointer"
                    >
                        <LinkIcon />
                        {url?.original_url}
                    </a>
                    <span className="flex items-end font-extralight text-sm">
                        {new Date(url?.created_at).toLocaleString()}
                    </span>

                    <div className="flex gap-2">
                        <Button
                            variant="ghost"
                            onClick={() =>
                                navigator.clipboard.writeText(
                                    `${BASE_URL}${url?.short_url}`
                                )
                            }
                        >
                            <Copy />
                        </Button>
                        <Button variant="ghost" onClick={downloadImage}>
                            <Download />
                        </Button>
                        <Button variant="ghost" onClick={() => fnDelete()}>
                            {loadingDelete ? (
                                <BeatLoader size={5} color="#fff" />
                            ) : (
                                <Trash />
                            )}
                        </Button>
                    </div>

                    <img
                        src={url?.qr}
                        alt={url?.title}
                        className="w-full object-contain ring ring-blue-500 self-center sm:self-start"
                    />
                </div>

                <Card className="sm:w-3/5">
                    <CardHeader>
                        <CardTitle className="text-4xl font-extrabold">
                            Stats
                        </CardTitle>
                    </CardHeader>
                    {stats && stats.length ? (
                        <CardContent className="flex flex-col gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Total Clicks</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>{stats?.length}</p>
                                </CardContent>
                            </Card>

                            <CardTitle>Location Data</CardTitle>
                            <LocationStats stats={stats} />
                            <CardTitle>Device Info</CardTitle>
                            <DeviceStats stats={stats} />
                        </CardContent>
                    ) : (
                        <CardContent>
                            {loadingStats === false
                                ? "No statistics yet"
                                : "Loading Statistics"}
                        </CardContent>
                    )}
                </Card>
            </div>
        </>
    );
};

export default Link;
