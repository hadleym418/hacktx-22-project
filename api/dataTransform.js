const fs = require('fs');

const fileData = fs.readFileSync('data.json', 'utf8');
const oldData = JSON.parse(fileData);

async function byDomain() {
    const newData = {domains: []};

    for (let item of oldData.domains) {
        const mainDomain = item.domain.split('.').slice(-2).join('.');
        if (!newData.domains.find(e => e.domain === mainDomain)) {
            const newItem = {
                domain: mainDomain,
                count: 1,
                emails: [{openStatus: item.data.openStatus, size: item.data.size}]
            };
            newData.domains.push(newItem);
        } else {
            const index = newData.domains.findIndex(x => x.domain === mainDomain);
            newData.domains[index].count++;
            newData.domains[index].emails.push({openStatus: item.data.openStatus, size: item.data.size});
        }
    }
    newData.domains.sort((a, b) => b.count - a.count);
    newData.domains = newData.domains.slice(0, 10);
    const data = {domains: []};
    for (let domain of newData.domains) {
        const fullSize = domain.emails.reduce((a, b) => a + b.size, 0) / 1_000_000;
        const openRate = domain.emails.reduce((a, b) => a + b.openStatus, 0) / domain.emails.length * 100;
        data.domains.push({
            domain: domain.domain, fullSize: fullSize.toFixed(2),
            openRate: openRate.toFixed(2), count: domain.count
        });
    }
    return data;
}

async function byAuthor() {
    const newData = {authors: []};
    for (let item of oldData.domains) {
        const author = item.data.author.slice(item.data.author.indexOf('<') + 1, item.data.author.indexOf('>'));
        if (!newData.authors.find(e => e.author === author)) {
            const newItem = {author, count: 1, emails: [{domain: item.domain, ...item.data}]};
            newData.authors.push(newItem);
        } else {
            const index = newData.authors.findIndex(x => x.author === author);
            newData.authors[index].count++;
            newData.authors[index].emails.push({domain: item.domain, ...item.data});
        }
    }
    newData.authors.sort((a, b) => b.count - a.count);
    newData.authors = newData.authors.slice(0, 10);
    const data = {authors: []};
    for (let author of newData.authors) {
        const fullSize = author.emails.reduce((a, b) => a + b.size, 0) / 1_000_000;
        const openRate = author.emails.reduce((a, b) => a + b.openStatus, 0) / author.emails.length * 100;
        data.authors.push({
            author: author.author, fullSize: fullSize.toFixed(2),
            openRate: openRate.toFixed(2), count: author.count
        });
    }

    return data;
}

async function bySubDomain() {
    const newData = {subDomains: []};
    for (let item of oldData.domains) {
        const subDomain = item.domain
        if (!newData.subDomains.find(e => e.subDomain === subDomain)) {
            const newItem = {subDomain, count: 1, emails: [{domain: item.domain, ...item.data}]};
            newData.subDomains.push(newItem);
        } else {
            const index = newData.subDomains.findIndex(x => x.subDomain === subDomain);
            newData.subDomains[index].count++;
            newData.subDomains[index].emails.push({domain: item.domain, ...item.data});
        }
    }
    newData.subDomains.sort((a, b) => b.count - a.count);
    newData.subDomains = newData.subDomains.slice(0, 10);
    const data = {subDomains: []};
    for (let subDomain of newData.subDomains) {

        const fullSize = subDomain.emails.reduce((a, b) => a + b.size, 0) / 1_000_000;
        const openRate = subDomain.emails.reduce((a, b) => a + b.openStatus, 0) / subDomain.emails.length * 100;
        data.subDomains.push({
            subDomain: subDomain.subDomain,
            fullSize: fullSize.toFixed(2),
            openRate: openRate.toFixed(2),
            count: subDomain.count
        })
        ;
    }

    return data;

}



