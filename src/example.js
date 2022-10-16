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
// import {byAuthor, byDomain, bySubDomain} from '../api/dataTransform';


const MenuExampleSecondaryPointing = () => {
    const [activeItem, setActiveItem] = React.useState("Domain");
    const [segmentValue, setSegmentValue] = React.useState();
    const [domainTag, setDomainTag] = React.useState();

    React.useEffect(() => {
        console.log(data["domains"]);
        const dataDomain = data["domains"].map(cardFunc);
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
                                    {`${domain["count"]}%`}
                                    <Icon link name="trash"/>
                                </Statistic.Value>
                                <Card.Meta>{`Read ${domain["read"]}%`}</Card.Meta>
                            </Statistic>
                        </Image>
                        <Card.Header>
                            {domain["domain"]} <Icon link name="chevron right"/>
                        </Card.Header>
                        <Card.Meta>{`Size ${domain["size"]}%`}</Card.Meta>
                    </Card.Content>
                </Card>
            </Card.Group>
        );
    };
    const handleItemClick = (e, {name}) => {
        setActiveItem(name);
        switch (name) {
            case "Domain":
                setSegmentValue(domainTag);
                break;
            case "Subdomain":
                setSegmentValue(<Header>Subdomain</Header>);
                break;
            case "Author":
                setSegmentValue(<Header>Author</Header>);
                break;
        }
    };

    return (
        <div>
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
