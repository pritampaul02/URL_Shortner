import React, { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const [longUrl, setLongUrl] = useState("");

    const navigate = useNavigate();

    const handleShorten = (e) => {
        e.preventDefault();

        if (longUrl) {
            navigate(`/auth/?createNew=${longUrl}`);
        }
    };
    return (
        <div className="flex flex-col items-center">
            <h2 className="my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-white text-center font-extrabold">
                The only URL shortner <br /> you&rsquo;ll ever need!👇
            </h2>

            <form className="sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2">
                <Input
                    type={"url"}
                    placeholder="Enter your looooong URL"
                    className={"h-full flex-1 py-4 px-4"}
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                />
                <Button
                    className={"h-full"}
                    type="submit"
                    variant="destructive"
                    onClick={handleShorten}
                >
                    Shorten!
                </Button>
            </form>

            <Accordion
                type="multiple"
                collapsible
                className="mt-6 w-full md:w-[calc(100%-20rem)] md:px-11"
            >
                <AccordionItem value="item-1">
                    <AccordionTrigger>
                        Is it absolutely Free for all?
                    </AccordionTrigger>
                    <AccordionContent>
                        Yes. This is totaly free for the every users. No limit
                        of shorten URLs.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>
                        How does the Minify URL works?
                    </AccordionTrigger>
                    <AccordionContent>
                        When you entered a long url out system generates a short
                        link of that URL.This Shortened URL redirects to the
                        original long URL when accessed.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>
                        Do I need an account to use the app?
                    </AccordionTrigger>
                    <AccordionContent>
                        Yes. Creating an account allows you to manage your URLs,
                        view analytics and customize your short URLs.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger>
                        What analytics are available for my shortened URLs?
                    </AccordionTrigger>
                    <AccordionContent>
                        You can view the number of clicks, geolocation data of
                        the clicks and device type like mobile or desktop for
                        each of your shortened URLs.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};

export default LandingPage;
