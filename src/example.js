import React from "react";
import {
    Menu,
    Header,
    Segment,
    Card,
    Image,
    Statistic,
    Icon
} from "semantic-ui-react";
import data from "./data.json";
import {byAuthor, byDomain, bySubDomain} from './api/dataTransform';


const MenuExampleSecondaryPointing = () => {

    const [activeItem, setActiveItem] = React.useState("Domain");
    const [segmentValue, setSegmentValue] = React.useState();
    const [domainTag, setDomainTag] = React.useState();

    React.useEffect(async () => {
        const domainData = await byDomain();
        const dataDomain = domainData["domains"].map(cardFunc);
        setSegmentValue(dataDomain);
        setDomainTag(dataDomain);
        //const subdomain = data["subdomains"];
        //const author = data["authors"];
    }, []);

    const cardFunc = (domain) => {
        return (
            <Card.Group>
                <Card fluid>
                    <Card.Content>
                        <Image floated="left" size="tiny">
                            <Statistic size="mini">
                                <Statistic.Value>
                                    {`${domain["count"]}`}
                                    <Icon link name="trash"/>
                                </Statistic.Value>
                                <Card.Meta>{`Read ${domain.openRate}%`}</Card.Meta>
                            </Statistic>
                        </Image>
                        <Card.Header>
                            {domain.domain || domain.author || domain.subDomain} <Icon link name="chevron right"/>
                        </Card.Header>
                        <Card.Meta>{`Size ${domain.fullSize}mb`}</Card.Meta>
                    </Card.Content>
                </Card>
            </Card.Group>
        );
    };
    const handleItemClick = async (e, {name}) => {
        setActiveItem(name);
        switch (name) {
            case "Domain":

                //setData(domainD ata);
                const domainData = await byDomain();
                const dataDomain = domainData["domains"].map(cardFunc);
                setSegmentValue(dataDomain);
                setDomainTag(dataDomain);
                break;
            case "Subdomain":
                const subDomainData = await bySubDomain();
                setSegmentValue(subDomainData["subDomains"].map(cardFunc));
                break;
            case "Author":
                const authorData = await byAuthor();
                setSegmentValue(authorData['authors'].map(cardFunc));
                break;
        }
    };

    return (
        <div>
            <h1>Top 10</h1>
            <Menu pointing secondary>
                <Menu.Item
                    name="Domain"
                    active={activeItem === "Domain"}
                    onClick={handleItemClick}
                />
                <Menu.Item
                    name="Subdomain"
                    active={activeItem === "Subdomain"}
                    onClick={handleItemClick}
                />
                <Menu.Item
                    name="Author"
                    active={activeItem === "Author"}
                    onClick={handleItemClick}
                />
            </Menu>

            <Segment>{segmentValue}</Segment>
        </div>
    );
};
export default MenuExampleSecondaryPointing;
