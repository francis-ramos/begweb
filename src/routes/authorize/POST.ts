import { system } from "@/utils";

export default async function(req: Request) {
    const body = await req.json();

    if (body.type == 'new') {
        const id = body.username.replaceAll(/\s/g, '');
        if (system.has(id)) return Response.json({ 
            message: "User already exist" 
        }, { 
            status: 401
        });

        let new_id = crypto.randomUUID();
        system.set(id, { id, key: new_id, password: body.password })

        return Response.json({
            message: 'User has been created'
        }, {
            status: 200
        });
    } else if (body.type == 'authorize') {
        const id = body.username.replaceAll(/\s/g, '');
        if (!system.has(id)) return Response.json({ 
            message: "User not found" 
        }, { 
            status: 401
        });

        if (body.password !== system.get(id).password) return Response.json({ 
            message: "Incorrect Password" 
        }, { 
            status: 401
        });

        return Response.json({
            message: 'User have been found'
        }, {
            status: 200,
            headers: {
                'Set-Cookie': `session=${system.get(id).key}; HttpOnly; Path=/; Max-Age=30`
            }
        })
    } else if (body.type == 'request') {
        const session = req.headers.get('Cookie')?.split('; ').find(i => i.startsWith("session"))?.split("=")[1];
        if (!session) return;

        const array = Array.from(system.entries());
        const filter: any = array.filter(([_, v]) => v.key == session);
        const obj = filter.shift()[1];

        return Response.json({ ...obj }, { status: 200 })
    }
}